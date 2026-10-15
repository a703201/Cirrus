import { TemperatureUnit, ThemeMode, MaterialTier } from 'common';
import { listSources, WeatherSource } from 'data';
import { appStore } from '../../store/AppStore';

/**
 * 设置页（P1-4/P1-10, docs/13 §9）。
 * 单项切换（数据源 / 单位 / 主题 / 材质 / 语言）统一改为下拉菜单（Menu + bindMenu）：
 * bindMenu 按官方样本结构**直接绑定在 build() 内的行容器上**（不放进 @Builder 中转——
 * CustomBuilder 内使用 bindMenu 弹出菜单受限，正是此前菜单点不开的根因），点击行即弹出菜单，
 * 已选项带选中态；选中后通过 `appStore.updateSettings` 持久化。
 * 「数据与隐私」经 NavPathStack.pushPath 进入二级页面（HdsNavDestination，见 Index.navDestination）。
 */
@ComponentV2
export struct SettingsPage {
  @Param pageStack: NavPathStack = new NavPathStack();

  build() {
    Column({ space: 12 }) {
      Text($r('app.string.tab_settings')).fontSize(20).fontWeight(FontWeight.Medium)

      // 数据源
      Row({ space: 8 }) {
        Text($r('app.string.settings_source')).fontSize(16).layoutWeight(1)
        Text(this.sourceLabel()).fontSize(14).fontColor('#666666')
        Text('▾').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .bindMenu(this.sourceMenu, { placement: Placement.BottomRight })

      // 单位
      Row({ space: 8 }) {
        Text($r('app.string.settings_unit')).fontSize(16).layoutWeight(1)
        Text(this.unitLabel()).fontSize(14).fontColor('#666666')
        Text('▾').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .bindMenu(this.unitMenu, { placement: Placement.BottomRight })

      // 主题
      Row({ space: 8 }) {
        Text($r('app.string.settings_theme')).fontSize(16).layoutWeight(1)
        Text(this.themeLabel()).fontSize(14).fontColor('#666666')
        Text('▾').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .bindMenu(this.themeMenu, { placement: Placement.BottomRight })

      // 沉浸光感
      Row({ space: 8 }) {
        Text($r('app.string.settings_material')).fontSize(16).layoutWeight(1)
        Text(this.materialLabel()).fontSize(14).fontColor('#666666')
        Text('▾').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .bindMenu(this.materialMenu, { placement: Placement.BottomRight })

      // 语言
      Row({ space: 8 }) {
        Text($r('app.string.settings_language')).fontSize(16).layoutWeight(1)
        Text(this.languageLabel()).fontSize(14).fontColor('#666666')
        Text('▾').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .bindMenu(this.languageMenu, { placement: Placement.BottomRight })

      // 数据与隐私（二级页面）
      Row({ space: 8 }) {
        Text($r('app.string.settings_privacy')).fontSize(16).layoutWeight(1)
        Text('›').fontSize(14).fontColor('#999999').accessibilityLevel('no')
      }
      .width('100%')
      .padding(14)
      .backgroundColor('rgba(255,255,255,0.6)')
      .borderRadius(12)
      .accessibilityGroup(true)
      .onClick(() => {
        this.pageStack.pushPath({ name: 'Privacy' });
      })
    }
    .padding({ top: 44, left: 16, right: 16, bottom: 92 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  sourceMenu() {
    Menu() {
      // 菜单弹窗上下文用 ForEach（Repeat 面向主列表树，弹窗内不保证渲染）。
      ForEach(listSources(), (src: WeatherSource) => {
        MenuItem({ content: src.displayName })
          .selected(src.id === appStore.settings.sourceId)
          .onClick(() => {
            appStore.updateSettings({ sourceId: src.id });
          })
      }, (src: WeatherSource) => src.id)
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
