import { TemperatureUnit, ThemeMode, MaterialTier } from 'common';
import { listSources, WeatherSource } from 'data';
import { appStore } from '../../store/AppStore';

/**
 * 设置页（P1-4/P1-10, docs/13 §9）。
 * 单项切换（数据源 / 单位 / 主题 / 材质 / 语言）统一改为下拉菜单（Menu + bindMenu），
 * 点击行即弹出菜单，已选项带选中态；选中后通过 `appStore.updateSettings` 持久化。
 */
@ComponentV2
export struct SettingsPage {
  build() {
    Column({ space: 12 }) {
      Text($r('app.string.tab_settings')).fontSize(20).fontWeight(FontWeight.Medium)

      this.optionRow($r('app.string.settings_source'), this.sourceLabel(), this.sourceMenu)
      this.optionRow($r('app.string.settings_unit'), this.unitLabel(), this.unitMenu)
      this.optionRow($r('app.string.settings_theme'), this.themeLabel(), this.themeMenu)
      this.optionRow($r('app.string.settings_material'), this.materialLabel(), this.materialMenu)
      this.optionRow($r('app.string.settings_language'), this.languageLabel(), this.languageMenu)
    }
    .padding(16)
    .width('100%')
  }

  /** 统一的「标签 + 当前值 + 指示箭头」下拉行；菜单由 `menu` builder 经 bindMenu 弹出。 */
  @Builder
  optionRow(label: Resource, current: ResourceStr, menu: CustomBuilder) {
    Row({ space: 8 }) {
      Text(label).fontSize(16).layoutWeight(1)
      Text(current).fontSize(14).fontColor('#666666')
      Text('▾').fontSize(14).fontColor('#999999')
    }
    .width('100%')
    .padding(14)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .bindMenu(menu)
  }

  @Builder
  sourceMenu() {
    Menu() {
      ForEach(listSources(), (src: WeatherSource) => {
        MenuItem({ content: src.displayName })
          .selected(src.id === appStore.settings.sourceId)
          .onClick(() => {
            appStore.updateSettings({ sourceId: src.id });
          })
      })
    }
  }

  @Builder
  unitMenu() {
    Menu() {
      MenuItem({ content: $r('app.string.unit_celsius') })
        .selected(appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS)
        .onClick(() => {
          appStore.updateSettings({ temperatureUnit: TemperatureUnit.CELSIUS });
        })
      MenuItem({ content: $r('app.string.unit_fahrenheit') })
        .selected(appStore.settings.temperatureUnit === TemperatureUnit.FAHRENHEIT)
        .onClick(() => {
          appStore.updateSettings({ temperatureUnit: TemperatureUnit.FAHRENHEIT });
        })
    }
  }

  @Builder
  themeMenu() {
    Menu() {
      MenuItem({ content: $r('app.string.settings_theme_auto') })
        .selected(appStore.settings.theme === ThemeMode.AUTO)
        .onClick(() => {
          appStore.updateSettings({ theme: ThemeMode.AUTO });
        })
      MenuItem({ content: $r('app.string.settings_theme_light') })
        .selected(appStore.settings.theme === ThemeMode.LIGHT)
        .onClick(() => {
          appStore.updateSettings({ theme: ThemeMode.LIGHT });
        })
      MenuItem({ content: $r('app.string.settings_theme_dark') })
        .selected(appStore.settings.theme === ThemeMode.DARK)
        .onClick(() => {
          appStore.updateSettings({ theme: ThemeMode.DARK });
        })
    }
  }

  @Builder
  materialMenu() {
    Menu() {
      MenuItem({ content: $r('app.string.material_auto') })
        .selected(appStore.settings.materialLevel === MaterialTier.AUTO)
        .onClick(() => {
          appStore.updateSettings({ materialLevel: MaterialTier.AUTO });
        })
      MenuItem({ content: $r('app.string.material_exquisite') })
        .selected(appStore.settings.materialLevel === MaterialTier.EXQUISITE)
        .onClick(() => {
          appStore.updateSettings({ materialLevel: MaterialTier.EXQUISITE });
        })
      MenuItem({ content: $r('app.string.material_gentle') })
        .selected(appStore.settings.materialLevel === MaterialTier.GENTLE)
        .onClick(() => {
          appStore.updateSettings({ materialLevel: MaterialTier.GENTLE });
        })
      MenuItem({ content: $r('app.string.material_smooth') })
        .selected(appStore.settings.materialLevel === MaterialTier.SMOOTH)
        .onClick(() => {
          appStore.updateSettings({ materialLevel: MaterialTier.SMOOTH });
        })
    }
  }

  @Builder
  languageMenu() {
    Menu() {
      MenuItem({ content: $r('app.string.settings_language_system') })
        .selected(appStore.settings.language === 'system')
        .onClick(() => {
          appStore.updateSettings({ language: 'system' });
        })
      MenuItem({ content: 'English' })
        .selected(appStore.settings.language === 'en')
        .onClick(() => {
          appStore.updateSettings({ language: 'en' });
        })
      MenuItem({ content: '中文' })
        .selected(appStore.settings.language === 'zh-CN')
        .onClick(() => {
          appStore.updateSettings({ language: 'zh-CN' });
        })
    }
  }

  private sourceLabel(): string {
    const list: WeatherSource[] = listSources();
    const found: WeatherSource | undefined =
      list.find((s: WeatherSource) => s.id === appStore.settings.sourceId);
    return found ? found.displayName : '';
  }

  private unitLabel(): Resource {
    return appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS
      ? $r('app.string.unit_celsius')
      : $r('app.string.unit_fahrenheit');
  }

  private themeLabel(): Resource {
    if (appStore.settings.theme === ThemeMode.LIGHT) {
      return $r('app.string.settings_theme_light');
    }
    if (appStore.settings.theme === ThemeMode.DARK) {
      return $r('app.string.settings_theme_dark');
    }
    return $r('app.string.settings_theme_auto');
  }

  private materialLabel(): Resource {
    if (appStore.settings.materialLevel === MaterialTier.EXQUISITE) {
      return $r('app.string.material_exquisite');
    }
    if (appStore.settings.materialLevel === MaterialTier.GENTLE) {
      return $r('app.string.material_gentle');
    }
    if (appStore.settings.materialLevel === MaterialTier.SMOOTH) {
      return $r('app.string.material_smooth');
    }
    return $r('app.string.material_auto');
  }

  private languageLabel(): ResourceStr {
    if (appStore.settings.language === 'en') {
      return 'English';
    }
    if (appStore.settings.language === 'zh-CN') {
      return '中文';
    }
    return $r('app.string.settings_language_system');
  }
}
