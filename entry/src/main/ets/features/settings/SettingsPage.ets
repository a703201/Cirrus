import { TemperatureUnit, ThemeMode, MaterialTier } from 'common';
import { listSources, WeatherSource } from 'data';
import { appStore } from '../../store/AppStore';

@ComponentV2
export struct SettingsPage {
  build() {
    Column({ space: 10 }) {
      Text($r('app.string.tab_settings')).fontSize(20).fontWeight(FontWeight.Medium)

      this.sourceSection()
      this.unitSection()
      this.themeSection()
      this.materialSection()
      this.languageSection()
    }
    .padding(16)
    .width('100%')
  }

  @Builder
  sourceSection() {
    Column({ space: 6 }) {
      Text($r('app.string.settings_source')).fontSize(16).fontWeight(FontWeight.Medium)
      Repeat<WeatherSource>(listSources())
        .each((ri: RepeatItem<WeatherSource>) => {
          Row() {
            Text(ri.item.displayName).fontSize(14).layoutWeight(1)
            Radio({ value: ri.item.id, group: 'source' })
              .checked(ri.item.id === appStore.settings.sourceId)
              .onChange((checked: boolean) => {
                if (checked) {
                  appStore.updateSettings({ sourceId: ri.item.id });
                }
              })
          }
          .padding(10)
          .backgroundColor('rgba(255,255,255,0.6)')
          .borderRadius(12)
        })
        .key((src: WeatherSource) => src.id)
    }
  }

  @Builder
  unitSection() {
    Column({ space: 6 }) {
      Text($r('app.string.settings_unit')).fontSize(16).fontWeight(FontWeight.Medium)
      Row({ space: 8 }) {
        Row() {
          Text($r('app.string.unit_celsius')).fontSize(14).layoutWeight(1)
          Radio({ value: TemperatureUnit.CELSIUS, group: 'unit' })
            .checked(appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS)
            .onChange((checked: boolean) => {
              if (checked) {
                appStore.updateSettings({ temperatureUnit: TemperatureUnit.CELSIUS });
              }
            })
        }
        .padding(10)
        .backgroundColor('rgba(255,255,255,0.6)')
        .borderRadius(12)
        .layoutWeight(1)

        Row() {
          Text($r('app.string.unit_fahrenheit')).fontSize(14).layoutWeight(1)
          Radio({ value: TemperatureUnit.FAHRENHEIT, group: 'unit' })
            .checked(appStore.settings.temperatureUnit === TemperatureUnit.FAHRENHEIT)
            .onChange((checked: boolean) => {
              if (checked) {
                appStore.updateSettings({ temperatureUnit: TemperatureUnit.FAHRENHEIT });
              }
            })
        }
        .padding(10)
        .backgroundColor('rgba(255,255,255,0.6)')
        .borderRadius(12)
        .layoutWeight(1)
      }
    }
  }

  @Builder
  themeSection() {
    Column({ space: 6 }) {
      Text($r('app.string.settings_theme')).fontSize(16).fontWeight(FontWeight.Medium)
      Row({ space: 8 }) {
        this.themeOption($r('app.string.settings_theme_auto'), ThemeMode.AUTO)
        this.themeOption($r('app.string.settings_theme_light'), ThemeMode.LIGHT)
        this.themeOption($r('app.string.settings_theme_dark'), ThemeMode.DARK)
      }
    }
  }

  @Builder
  themeOption(label: Resource, mode: ThemeMode) {
    Row() {
      Text(label).fontSize(14).layoutWeight(1)
      Radio({ value: mode, group: 'theme' })
        .checked(appStore.settings.theme === mode)
        .onChange((checked: boolean) => {
          if (checked) {
            appStore.updateSettings({ theme: mode });
          }
        })
    }
    .padding(10)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .layoutWeight(1)
  }

  @Builder
  materialSection() {
    Column({ space: 6 }) {
      Text($r('app.string.settings_material')).fontSize(16).fontWeight(FontWeight.Medium)
      Row({ space: 6 }) {
        this.materialOption($r('app.string.material_auto'), MaterialTier.AUTO)
        this.materialOption($r('app.string.material_exquisite'), MaterialTier.EXQUISITE)
      }
      Row({ space: 6 }) {
        this.materialOption($r('app.string.material_gentle'), MaterialTier.GENTLE)
        this.materialOption($r('app.string.material_smooth'), MaterialTier.SMOOTH)
      }
    }
  }

  @Builder
  materialOption(label: Resource, tier: MaterialTier) {
    Row() {
      Text(label).fontSize(14).layoutWeight(1)
      Radio({ value: tier, group: 'material' })
        .checked(appStore.settings.materialLevel === tier)
        .onChange((checked: boolean) => {
          if (checked) {
            appStore.updateSettings({ materialLevel: tier });
          }
        })
    }
    .padding(10)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .layoutWeight(1)
  }

  @Builder
  languageSection() {
    Column({ space: 6 }) {
      Text($r('app.string.settings_language')).fontSize(16).fontWeight(FontWeight.Medium)
      Row({ space: 8 }) {
        this.languageOption($r('app.string.settings_language_system'), 'system')
        this.languageOption('English', 'en')
        this.languageOption('中文', 'zh-CN')
      }
    }
  }

  @Builder
  languageOption(label: Resource | string, lang: string) {
    Row() {
      Text(label).fontSize(14).layoutWeight(1)
      Radio({ value: lang, group: 'language' })
        .checked(appStore.settings.language === lang)
        .onChange((checked: boolean) => {
          if (checked) {
            appStore.updateSettings({ language: lang });
          }
        })
    }
    .padding(10)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .layoutWeight(1)
  }
}
