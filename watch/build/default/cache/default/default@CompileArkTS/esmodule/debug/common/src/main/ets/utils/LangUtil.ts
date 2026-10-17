import i18n from "@ohos:i18n";
import { Log } from "@bundle:com.Lumio.Cirrus/watch@common/ets/utils/Log";
function shortToLocale(short: string): string {
    switch (short) {
        case 'zh':
            return 'zh-CN';
        case 'ja':
            return 'ja-JP';
        case 'ko':
            return 'ko-KR';
        case 'fr':
            return 'fr-FR';
        case 'es':
            return 'es-ES';
        case 'de':
            return 'de-DE';
        case 'en':
            return 'en-US';
        default:
            return '';
    }
}
/** 当前系统语言对应的资源标签（供「跟随系统」即时生效使用）。 */
export function systemResourceLocale(): string {
    try {
        const locale: string = i18n.System.getSystemLocaleInstance().toString();
        const mapped: string = shortToLocale(locale.split('-')[0]);
        return mapped.length > 0 ? mapped : 'en-US';
    }
    catch (e) {
        Log.w(`systemResourceLocale failed: ${e}`);
        return 'en-US';
    }
}
/**
 * `settings.language`（'system' / 'en' / 'zh-CN' …）→ 资源语言标签。
 * 'system' / 空值 → 当前系统语言的具体标签（保证即时生效）。
 */
export function toResourceLocale(lang: string): string {
    if (lang === 'system' || lang === 'default' || lang.length === 0) {
        return systemResourceLocale();
    }
    const mapped: string = shortToLocale(lang.split('-')[0]);
    return mapped.length > 0 ? mapped : lang;
}
/**
 * 语言变更回调。`Index.ets` 在启动时注册，用于在语言真正变化后重建 UI。
 * 不变式：仅当 `applyAppLanguage` 判定「资源语言标签发生变化」时才会触发，
 * 因此冷启动阶段 `EntryAbility.prepareLanguage()` 的登记调用不会引发多余的重建。
 */
type LanguageAppliedListener = () => void;
let languageListener: LanguageAppliedListener | undefined = undefined;
let appliedTag: string = '';
/** 注册语言变更回调（同一时刻仅保留最后一个）。返回注销函数。 */
export function setLanguageAppliedListener(listener?: LanguageAppliedListener): void {
    languageListener = listener;
}
/**
 * 设置应用首选语言（决定 `$r()` 资源与页签文案走哪套语言）。失败静默降级，不阻断启动。
 *
 * @returns 资源语言标签是否发生了变化（true 表示需要重建 UI）。
 */
export function applyAppLanguage(lang: string): boolean {
    const tag: string = toResourceLocale(lang);
    let ok: boolean = false;
    try {
        i18n.System.setAppPreferredLanguage(tag);
        ok = true;
        Log.i(`app preferred language: ${tag}`);
    }
    catch (e) {
        Log.w(`setAppPreferredLanguage failed: ${e}`);
    }
    // 启动阶段也走这里，此时不应触发重建（回调尚未注册，且 appliedTag 初值为空串，
    // 与 tag 必然不同）。故用「回调已注册」作为是否属于运行期切换的判据。
    if (languageListener === undefined) {
        appliedTag = tag;
        return false;
    }
    if (tag === appliedTag) {
        return false;
    }
    appliedTag = tag;
    if (ok) {
        Log.i(`language changed to ${tag}, rebuilding UI`);
        languageListener();
    }
    return ok;
}
