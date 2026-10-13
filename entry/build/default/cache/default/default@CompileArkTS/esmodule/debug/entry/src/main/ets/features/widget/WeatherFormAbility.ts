import FormExtensionAbility from "@ohos:app.form.FormExtensionAbility";
import formBindingData from "@ohos:app.form.formBindingData";
import formProvider from "@ohos:app.form.formProvider";
import type Want from "@ohos:app.ability.Want";
import type common from "@ohos:app.ability.common";
import i18n from "@ohos:i18n";
import type { BusinessError } from "@ohos:base";
import { Log, wmoDescription, wmoIconKey, UnitUtil, DateTimeUtil } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { rdbStore, settingsStore, WeatherRepository } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
const FORM_ID_KEY: string = 'formId';
const CACHE_TTL_MS: number = 30 * 60 * 1000;
/** 卡片数据契约：Ability 下发 → UI 经 @LocalStorageProp 接收（字段名一一对应）。 */
interface FormCardData {
    locationName: string;
    temperature: string;
    condition: string;
    tempMax: string;
    tempMin: string;
    updatedAt: string;
    iconKey: string;
}
/**
 * 桌面/锁屏服务卡片 Ability（P1-7, PRD F08, docs/03 §5）。
 *
 * 关键约束（来自「碰卡软件」经验）：Form 运行在**独立 form 进程**，无法访问主进程
 * AppStore 内存状态，必须**独立**从 RDB 缓存与 Preferences 设置读取真实数据。
 * - onAddForm 同步返回占位数据，随后异步刷新并 updateForm 推真实数据；
 * - onUpdateForm 由系统定时（form_config updateDuration / scheduledUpdateTime）触发，重新拉取并推送；
 * - 网络刷新失败/超时不阻塞，一律回退到最近一次 RDB 缓存（离线友好）。
 */
export default class WeatherFormAbility extends FormExtensionAbility {
    private inited: boolean = false;
    onAddForm(want: Want): formBindingData.FormBindingData {
        const formId: string = (want.parameters?.[FORM_ID_KEY] as string) ?? '';
        Log.i(`WeatherFormAbility.onAddForm ${formId}`);
        this.refreshForm(formId);
        return formBindingData.createFormBindingData(this.placeholder());
    }
    onUpdateForm(formId: string): void {
        Log.i(`WeatherFormAbility.onUpdateForm ${formId}`);
        this.refreshForm(formId);
    }
    onRemoveForm(formId: string): void {
        Log.i(`WeatherFormAbility.onRemoveForm ${formId}`);
    }
    /** 异步拉取真实数据并推送到指定卡片（不阻塞生命周期回调）。 */
    private refreshForm(formId: string): void {
        this.buildCardData()
            .then((data: FormCardData) => {
            formProvider.updateForm(formId, formBindingData.createFormBindingData(data))
                .then(() => Log.i(`form updated ${formId}`))
                .catch((e: BusinessError) => Log.e(`form update failed: ${e}`));
        })
            .catch((e: BusinessError) => Log.e(`buildCardData failed: ${e}`));
    }
    private placeholder(locationName: string = ''): FormCardData {
        return {
            locationName: locationName,
            temperature: '--',
            condition: '',
            tempMax: '',
            tempMin: '',
            updatedAt: '',
            iconKey: ''
        };
    }
    /** 独立读取真实天气（默认位置最新缓存 + 尽力而为的网络刷新）。 */
    private async buildCardData(): Promise<FormCardData> {
        await this.ensureInit();
        const settings = await settingsStore.load();
        let locId: string = await rdbStore.getDefaultLocationId();
        if (!locId) {
            const locs = await rdbStore.listLocations();
            if (locs.length === 0) {
                return this.placeholder();
            }
            locId = locs[0].id;
        }
        const loc = await rdbStore.getLocation(locId);
        const lang: string = this.resolveLang(settings.language);
        let weather = await rdbStore.loadWeather(locId, settings.sourceId);
        // 尽力而为的实时刷新：仅缓存缺失或过旧时走网络，失败回退缓存。
        if (loc && (!weather || Date.now() - weather.fetchedAt > CACHE_TTL_MS)) {
            try {
                const repo: WeatherRepository = new WeatherRepository();
                weather = await repo.getWeather(loc, lang, settings.sourceId);
            }
            catch (e) {
                Log.w(`form live refresh skipped (cached used): ${e}`);
            }
        }
        if (!weather || !weather.current) {
            return this.placeholder(loc?.name ?? '');
        }
        const cur = weather.current;
        const temp: number = UnitUtil.convertTemp(cur.temperature, settings.temperatureUnit);
        const unitSym: string = UnitUtil.tempSymbol(settings.temperatureUnit);
        const hi: number | undefined = weather.daily.length
            ? UnitUtil.convertTemp(weather.daily[0].tempMax, settings.temperatureUnit)
            : undefined;
        const lo: number | undefined = weather.daily.length
            ? UnitUtil.convertTemp(weather.daily[0].tempMin, settings.temperatureUnit)
            : undefined;
        const iconKey: string = wmoIconKey(cur.weatherCode, cur.isDay);
        return {
            locationName: loc?.name ?? '',
            temperature: `${temp}${unitSym}`,
            condition: wmoDescription(cur.weatherCode, lang),
            tempMax: hi !== undefined ? `↑${hi}°` : '',
            tempMin: lo !== undefined ? `↓${lo}°` : '',
            updatedAt: `更新 ${DateTimeUtil.formatHour(weather.fetchedAt)}`,
            iconKey: iconKey
        };
    }
    private async ensureInit(): Promise<void> {
        if (this.inited) {
            return;
        }
        try {
            await rdbStore.init(this.context as common.Context);
            await settingsStore.init(this.context as common.Context);
            this.inited = true;
        }
        catch (e) {
            Log.e(`WeatherFormAbility init failed: ${e}`);
        }
    }
    /** 'system' → 系统区域（完整 locale，如 zh-CN）；显式 locale 原样返回。 */
    private resolveLang(language: string): string {
        if (language === 'system' || !language) {
            try {
                return i18n.System.getSystemLocaleInstance().toString();
            }
            catch (e) {
                return 'en-US';
            }
        }
        return language;
    }
}
