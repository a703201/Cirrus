import preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
import { DEFAULT_SETTINGS, Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { AppSettings, TemperatureUnit, ThemeMode } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
const STORE_NAME: string = 'cirrus_settings';
const KEY_SOURCE: string = 'sourceId';
const KEY_UNIT: string = 'temperatureUnit';
const KEY_THEME: string = 'theme';
const KEY_LANGUAGE: string = 'language';
/**
 * User settings persistence backed by Preferences (@kit.ArkData).
 * Cross-device sync (DistributedKV) is a P1 item (docs/12 §3, 06 §5).
 */
export class SettingsStore {
    private pref: preferences.Preferences | undefined = undefined;
    async init(context: common.Context): Promise<void> {
        try {
            const options: preferences.Options = { name: STORE_NAME };
            this.pref = await preferences.getPreferences(context, options);
            Log.i('SettingsStore ready');
        }
        catch (e) {
            Log.e(`SettingsStore init failed: ${e}`);
        }
    }
    async load(): Promise<AppSettings> {
        if (!this.pref) {
            return DEFAULT_SETTINGS;
        }
        let sourceId: string = DEFAULT_SETTINGS.sourceId;
        let unit: string = DEFAULT_SETTINGS.temperatureUnit;
        let theme: string = DEFAULT_SETTINGS.theme;
        let language: string = DEFAULT_SETTINGS.language;
        try {
            sourceId = await this.pref.get(KEY_SOURCE, DEFAULT_SETTINGS.sourceId) as string;
            unit = await this.pref.get(KEY_UNIT, DEFAULT_SETTINGS.temperatureUnit) as string;
            theme = await this.pref.get(KEY_THEME, DEFAULT_SETTINGS.theme) as string;
            language = await this.pref.get(KEY_LANGUAGE, DEFAULT_SETTINGS.language) as string;
        }
        catch (e) {
            Log.e(`SettingsStore load failed: ${e}`);
        }
        return {
            sourceId: sourceId,
            temperatureUnit: unit as TemperatureUnit,
            theme: theme as ThemeMode,
            language: language
        };
    }
    async save(settings: AppSettings): Promise<void> {
        if (!this.pref) {
            return;
        }
        try {
            await this.pref.put(KEY_SOURCE, settings.sourceId);
            await this.pref.put(KEY_UNIT, settings.temperatureUnit);
            await this.pref.put(KEY_THEME, settings.theme);
            await this.pref.put(KEY_LANGUAGE, settings.language);
            await this.pref.flush();
        }
        catch (e) {
            Log.e(`SettingsStore save failed: ${e}`);
        }
    }
}
export const settingsStore: SettingsStore = new SettingsStore();
