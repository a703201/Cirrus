import i18n from "@ohos:i18n";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/utils/Log";
/**
 * `settings.language`（'system' / 'en' / 'zh-CN' …）→ 资源语言标签。
 * 'system' / 空值 → 'default'（跟随系统语言）。
 */
export function toResourceLocale(lang: string): string {
    if (lang === 'system' || lang === 'default' || lang.length === 0) {
        return 'default';
    }
    switch (lang.split('-')[0]) {
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
            return 'default';
    }
}
/** 设置应用首选语言（决定 `$r()` 资源与页签文案走哪套语言）。失败静默降级，不阻断启动。 */
export function applyAppLanguage(lang: string): void {
    try {
        i18n.System.setAppPreferredLanguage(toResourceLocale(lang));
        Log.i(`app preferred language: ${toResourceLocale(lang)}`);
    }
    catch (e) {
        Log.w(`setAppPreferredLanguage failed: ${e}`);
    }
}
