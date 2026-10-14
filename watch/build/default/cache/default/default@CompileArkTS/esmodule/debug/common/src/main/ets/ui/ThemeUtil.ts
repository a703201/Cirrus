import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import type common from "@ohos:app.ability.common";
import { ThemeMode } from "@bundle:com.Lumio.Cirrus/watch@common/ets/models/Settings";
import { Log } from "@bundle:com.Lumio.Cirrus/watch@common/ets/utils/Log";
/**
 * 卷云·气象拟真 —— 动态天空主题（P1-10, docs/13 §4.2/§6）.
 *
 * 主色与背景渐变由「天气状况 × 昼夜」推导（确定性优先，不采用壁纸取色）。
 * `palette()` 为纯函数、无系统依赖；`applyThemeMode()` 负责把用户偏好落到系统外观。
 */
export interface SkyPalette {
    /** 背景渐变起始色（顶部）。 */
    bgTop: string;
    /** 背景渐变结束色（底部）。 */
    bgBottom: string;
    /** 强调色（图标/高亮）。 */
    accent: string;
}
export class ThemeUtil {
    private static isSnow(code: number): boolean {
        return (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
    }
    private static isRain(code: number): boolean {
        return (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
    }
    private static isFog(code: number): boolean {
        return code === 45 || code === 48;
    }
    private static isThunder(code: number): boolean {
        return code >= 95;
    }
    /**
     * 解析当前天空配色。
     * @param weatherCode WMO 天气码
     * @param isDay 是否白天
     * @param dark 是否深色模式（由系统外观驱动）
     */
    static palette(weatherCode: number, isDay: boolean, dark: boolean): SkyPalette {
        if (dark) {
            if (ThemeUtil.isThunder(weatherCode)) {
                return { bgTop: '#1B1230', bgBottom: '#0B0A14', accent: '#B69CFF' };
            }
            if (ThemeUtil.isSnow(weatherCode)) {
                return { bgTop: '#16233A', bgBottom: '#0B1220', accent: '#9CC3FF' };
            }
            if (ThemeUtil.isRain(weatherCode)) {
                return { bgTop: '#14222B', bgBottom: '#0A1218', accent: '#7FC8D8' };
            }
            if (ThemeUtil.isFog(weatherCode)) {
                return { bgTop: '#1A1F26', bgBottom: '#0C1014', accent: '#B9C2CC' };
            }
            return isDay
                ? { bgTop: '#0E1A33', bgBottom: '#08101F', accent: '#7EA6F0' }
                : { bgTop: '#0B1024', bgBottom: '#05070F', accent: '#8AA0E8' };
        }
        if (ThemeUtil.isThunder(weatherCode)) {
            return { bgTop: '#8E86A8', bgBottom: '#5A5470', accent: '#5B4B8A' };
        }
        if (ThemeUtil.isSnow(weatherCode)) {
            return { bgTop: '#DCE7F5', bgBottom: '#B9CBE0', accent: '#5B7FB0' };
        }
        if (ThemeUtil.isRain(weatherCode)) {
            return { bgTop: '#AFC3CE', bgBottom: '#8AA0AD', accent: '#3E6B7A' };
        }
        if (ThemeUtil.isFog(weatherCode)) {
            return { bgTop: '#D6DCE1', bgBottom: '#B4BDC4', accent: '#5C6770' };
        }
        if (weatherCode <= 1) {
            return isDay
                ? { bgTop: '#BFD8F2', bgBottom: '#F2D2A9', accent: '#3B82F6' }
                : { bgTop: '#243B62', bgBottom: '#141F38', accent: '#7EA6F0' };
        }
        return { bgTop: '#C9D6E2', bgBottom: '#A9BACB', accent: '#5B7FB0' };
    }
}
/**
 * 应用用户主题偏好到系统外观（P1-10, docs/11 §5）。
 * - LIGHT/DARK 经 `UIAbilityContext.setColorMode` 强制；AUTO 经 `COLOR_MODE_NOT_SET` 交还系统，
 *   由 EntryAbility.onConfigurationUpdate 持续同步 `themeModel.dark`。
 * 调用失败（如境外不支持 UI Design Kit）静默降级，不阻塞主流程。
 */
export function applyThemeMode(mode: ThemeMode, context: common.UIAbilityContext | undefined): void {
    try {
        if (context === undefined) {
            return;
        }
        let colorMode: ConfigurationConstant.ColorMode;
        if (mode === ThemeMode.DARK) {
            colorMode = ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
        }
        else if (mode === ThemeMode.LIGHT) {
            colorMode = ConfigurationConstant.ColorMode.COLOR_MODE_LIGHT;
        }
        else {
            colorMode = ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET;
        }
        context.setColorMode(colorMode);
    }
    catch (e) {
        Log.w(`applyThemeMode(${mode}) skipped: ${e}`);
    }
}
