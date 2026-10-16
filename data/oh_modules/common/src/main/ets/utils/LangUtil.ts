/**
 * 应用内语言切换（P2-7 i18n）。
 *
 * 关键机制（SDK 实证，`@ohos.i18n.d.ts:314` `i18n.System.setAppPreferredLanguage`）：
 * **资源按首选语言在应用启动时加载**，因此本方法必须在 `loadContent` 之前调用；
 * 运行中修改语言只影响**下次冷启动**，UI 需提示用户重启。
 */
import { i18n } from '@kit.LocalizationKit';
import { Log } from './Log';

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
  } catch (e) {
    Log.w(`setAppPreferredLanguage failed: ${e}`);
  }
}