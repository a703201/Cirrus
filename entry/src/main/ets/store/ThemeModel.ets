import { AppStorageV2 } from '@kit.ArkUI';
import { ThemeMode, ThemeUtil, SkyPalette } from 'common';

/**
 * 全局主题模型（P1-8/P1-10, docs/13 §4.2/§6）.
 * 状态管理 V2：@ObservedV2 + @Trace，经 AppStorageV2 全局共享。
 * `dark` 由系统外观（EntryAbility.onConfigurationUpdate）写入；
 * `themeMode` 为用户偏好（设置页）。
 */
@ObservedV2
export class ThemeModel {
  @Trace dark: boolean = false;
  @Trace themeMode: ThemeMode = ThemeMode.AUTO;

  resolveDark(): boolean {
    if (this.themeMode === ThemeMode.DARK) {
      return true;
    }
    if (this.themeMode === ThemeMode.LIGHT) {
      return false;
    }
    return this.dark;
  }

  /** 由天气状况 × 昼夜 × 深色 推导天空配色。 */
  palette(weatherCode: number, isDay: boolean): SkyPalette {
    return ThemeUtil.palette(weatherCode, isDay, this.resolveDark());
  }
}

export const themeModel: ThemeModel =
  AppStorageV2.connect(ThemeModel, () => new ThemeModel()) ?? new ThemeModel();