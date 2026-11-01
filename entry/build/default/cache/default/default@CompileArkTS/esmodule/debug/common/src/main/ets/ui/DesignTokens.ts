import curves from "@native:ohos.curves";
/**
 * 设计令牌 —— 基于 apple-design skill（wwdc「Designing Fluid Interfaces」「Details of UI Typography」
 * 「Materials & Depth」）与 HarmonyOS 原生组件的落地映射（docs/13 §4/§5）。
 *
 * 关键取舍：
 * - 字号层级由 **weight + size + leading 成组** 表达（不做单一维度堆叠）；
 * - 大字号用**负字距**、正文近 0，避免"标题松散、正文拥挤"；
 * - 材质层级：结构面更重、交互面更轻；**不与另一层浅色半透明叠加**（可读性塌陷）；
 * - 动效默认**临界阻尼**（damping 1.0 / response 0.35s），仅惯性手势才加轻微回弹。
 */
export class Tokens {
    // 间距（4 的倍数）
    static readonly SPACE_XS: number = 4;
    static readonly SPACE_SM: number = 8;
    static readonly SPACE_MD: number = 12;
    static readonly SPACE_LG: number = 16;
    static readonly SPACE_XL: number = 24;
    static readonly SPACE_2XL: number = 32;
    // 圆角
    static readonly RADIUS_SM: number = 12;
    static readonly RADIUS_MD: number = 16;
    static readonly RADIUS_LG: number = 22;
    static readonly RADIUS_XL: number = 28;
    // 字号
    static readonly FONT_DISPLAY: number = 84;
    static readonly FONT_TITLE: number = 22;
    static readonly FONT_HEADLINE: number = 17;
    static readonly FONT_BODY: number = 15;
    static readonly FONT_CAPTION: number = 12;
    /** 临界阻尼弹簧（Apple 默认）。response≈0.35s，damping=1.0。 */
    static spring(response: number = 0.35, damping: number = 1.0): ICurve {
        return curves.springMotion(response, damping);
    }
    /** 卡片底色（内容面）——深色下为低明度半透明，避免浅色叠浅色。 */
    static cardBg(dark: boolean): string {
        return dark ? 'rgba(26,30,38,0.55)' : 'rgba(255,255,255,0.62)';
    }
    /** 结构面底色（页面/分组容器）。 */
    static surfaceBg(dark: boolean): string {
        return dark ? '#0B0F16' : '#F3F6FA';
    }
    /** 主文本色。 */
    static ink(dark: boolean): string {
        return dark ? '#F2F4F8' : '#111417';
    }
    /** 次文本色（保证 ≥4.5:1）。 */
    static subInk(dark: boolean): string {
        return dark ? '#B9C2CF' : '#5B6470';
    }
    /** 分组标题（弱化但仍可读）。 */
    static sectionTitle(dark: boolean): string {
        return dark ? '#9AA8BC' : '#67717E';
    }
    /** 强调色。 */
    static accent(dark: boolean): string {
        return dark ? '#7EA6F0' : '#2F6FED';
    }
    /** 分隔线（发丝级）。 */
    static hairline(dark: boolean): string {
        return dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)';
    }
}
