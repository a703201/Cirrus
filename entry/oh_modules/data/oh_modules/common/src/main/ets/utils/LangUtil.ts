/**
 * 应用内语言切换（i18n）。
 *
 * ## 机制与坑点（SDK + 官方实践实证）
 * `i18n.System.setAppPreferredLanguage(tag)` **只改变资源查找路径**，已经渲染出来的
 * `$r()` 组件**不会自动刷新**（官方原话：「已渲染的组件不会自动重新渲染」）。
 * 因此仅调用该API 会出现"设置已保存但界面不变，必须重启应用"的假象。
 *
 * 另外，`setAppPreferredLanguage('default')` 虽表示「跟随系统」，但它同样受限于
 * 上述刷新时机，且在部分机型上会退化为沿用上一次的具体语言。
 *
 * ## 本工程的解法（写入偏好 + 重建 UI，双管齐下）
 * 1. `applyAppLanguage()`：把 'system' 解析为**系统语言的具体标签**（如 'zh-CN'）
 *    而非 'default'，再写入应用首选语言；
 * 2. `onLanguageApplied`：语言真正发生变化时触发全局回调，由 `Index.ets` 在
 *    `UIContext` 上重建根组件树，强制 `$r()` 按新语言重新解析 —— **无需重启应用**。
 *
 * 这样「切到英语」与「切回跟随系统」都能即时生效。
 */
import { i18n } from '@kit.LocalizationKit';
import { Log } from './Log';

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
  } catch (e) {
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
  } catch (e) {
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