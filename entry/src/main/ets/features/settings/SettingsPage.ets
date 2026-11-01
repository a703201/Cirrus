import { promptAction } from '@kit.ArkUI';
import { TemperatureUnit, ThemeMode, MaterialTier, Tokens } from 'common';
import { listAllSources, WeatherSource, QWeatherSource } from 'data';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';

/**
 * 设置页（重构，apple-design × HarmonyOS 原生）。
 *
 * - 分组卡片：外观 / 数据源 / 语言 / 更多；卡间 20vp 留白形成清晰分区；
 * - 行内为 标签 + 当前值（次文本色）+ chevron，点击态明确；卡内以发丝线分隔；
 * - 颜色统一走 `Tokens`（深浅色自适应，夜间可读）；
 * - ⚠️ `bindMenu` 必须**直接绑定在 build() 内联的行上**（放进 @Builder 会导致菜单点不开）。
 *
 * 位置管理改为入口 → 二级页 `Locations`（需求 5），geometryTransition 共享元素转场（需求 6）。
 */
@ComponentV2
export struct SettingsPage {
  @Param pageStack: NavPathStack = new NavPathStack();

  private keyDialog: CustomDialogController = new CustomDialogController({
    builder: QWeatherKeyDialog({}),
    alignment: DialogAlignment.Center,
    autoCancel: true
  });

  private openKeyDialog(): void {
    this.keyDialog.open();
  }

  private async setLanguage(lang: string): Promise<void> {
    await appStore.updateSettings({ language: lang });
  }

  private dk(): boolean {
    return themeModel.resolveDark();
  }

  build() {
    Scroll() {
      Column({ space: 20 }) {
        Text($r('app.string.tab_settings'))
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .letterSpacing(-0.6)
          .fontColor(Tokens.ink(this.dk()))
          .width('100%')

        // ── 外观 ──
        Column() {
          Row({ space: 8 }) {
            Text($r('app.string.settings_theme')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text(this.themeLabel()).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .bindMenu(this.themeMenu, { placement: Placement.BottomRight })

          Divider().color(Tokens.hairline(this.dk())).strokeWidth(0.5).margin({ left: 16, right: 16 })

          Row({ space: 8 }) {
            Text($r('app.string.settings_material')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text(this.materialLabel()).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .bindMenu(this.materialMenu, { placement: Placement.BottomRight })

          Divider().color(Tokens.hairline(this.dk())).strokeWidth(0.5).margin({ left: 16, right: 16 })

          Row({ space: 8 }) {
            Text($r('app.string.settings_unit')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text(this.unitLabel()).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .bindMenu(this.unitMenu, { placement: Placement.BottomRight })
        }
        .width('100%')
        .backgroundColor(Tokens.cardBg(this.dk()))
        .borderRadius(Tokens.RADIUS_LG)

        // ── 数据源 ──
        Column() {
          Row({ space: 8 }) {
            Text($r('app.string.settings_source')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text(this.sourceLabel()).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .bindMenu(this.sourceMenu, { placement: Placement.BottomRight })

          if (appStore.settings.sourceId === 'qweather') {
            Divider().color(Tokens.hairline(this.dk())).strokeWidth(0.5).margin({ left: 16, right: 16 })
            Row({ space: 8 }) {
              Text($r('app.string.settings_qweather_key')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
              Text($r('app.string.qweather_key_configured')).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
              Text($r('app.string.action_edit'))
                .fontSize(Tokens.FONT_BODY)
                .fontColor(Tokens.accent(this.dk()))
                .padding({ left: 10, right: 4, top: 4, bottom: 4 })
                .onClick(() => {
                  this.openKeyDialog();
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 15, bottom: 15 })
            .accessibilityGroup(true)
          }
        }
        .width('100%')
        .backgroundColor(Tokens.cardBg(this.dk()))
        .borderRadius(Tokens.RADIUS_LG)

        // ── 语言 ──
        Column() {
          Row({ space: 8 }) {
            Text($r('app.string.settings_language')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text(this.languageLabel()).fontSize(Tokens.FONT_BODY).fontColor(Tokens.subInk(this.dk()))
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .bindMenu(this.languageMenu, { placement: Placement.BottomRight })
        }
        .width('100%')
        .backgroundColor(Tokens.cardBg(this.dk()))
        .borderRadius(Tokens.RADIUS_LG)

        // ── 更多（入口页）──
        Column() {
          Row({ space: 8 }) {
            Text($r('app.string.tab_locations')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .geometryTransition('geo-locations')
          .onClick(() => {
            this.pageStack.pushPath({ name: 'Locations' });
          })

          Divider().color(Tokens.hairline(this.dk())).strokeWidth(0.5).margin({ left: 16, right: 16 })

          Row({ space: 8 }) {
            Text($r('app.string.settings_privacy')).fontSize(Tokens.FONT_HEADLINE).fontColor(Tokens.ink(this.dk())).layoutWeight(1)
            Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dk())).accessibilityLevel('no')
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 15, bottom: 15 })
          .accessibilityGroup(true)
          .geometryTransition('geo-privacy')
          .onClick(() => {
            this.pageStack.pushPath({ name: 'Privacy' });
          })
        }
        .width('100%')
        .backgroundColor(Tokens.cardBg(this.dk()))
        .borderRadius(Tokens.RADIUS_LG)
      }
      .padding({ top: 44, left: 16, right: 16, bottom: 108 })
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .align(Alignment.TopStart)
    .scrollBar(BarState.Off)
  }

  @Builder
  sourceMenu() {
    Menu() {
      ForEach(listAllSources(), (src: WeatherSource) => {
        MenuItem({
          content: src.needApiKey && !src.isAvailable()
            ? $r('app.string.qweather_source_unconfigured')
            : src.displayName
        })
          .selected(src.id === appStore.settings.sourceId)
          .onClick(() => {
            if (!src.isAvailable()) {
              this.openKeyDialog();
              return;
            }
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
          this.setLanguage('system');
        })
      MenuItem({ content: '中文' })
        .selected(appStore.settings.language === 'zh-CN')
        .onClick(() => {
          this.setLanguage('zh-CN');
        })
      MenuItem({ content: 'English' })
        .selected(appStore.settings.language === 'en')
        .onClick(() => {
          this.setLanguage('en');
        })
      MenuItem({ content: 'Français' })
        .selected(appStore.settings.language === 'fr-FR')
        .onClick(() => {
          this.setLanguage('fr-FR');
        })
      MenuItem({ content: '日本語' })
        .selected(appStore.settings.language === 'ja-JP')
        .onClick(() => {
          this.setLanguage('ja-JP');
        })
      MenuItem({ content: '한국어' })
        .selected(appStore.settings.language === 'ko-KR')
        .onClick(() => {
          this.setLanguage('ko-KR');
        })
      MenuItem({ content: 'Español' })
        .selected(appStore.settings.language === 'es-ES')
        .onClick(() => {
          this.setLanguage('es-ES');
        })
      MenuItem({ content: 'Deutsch' })
        .selected(appStore.settings.language === 'de-DE')
        .onClick(() => {
          this.setLanguage('de-DE');
        })
    }
  }

  private sourceLabel(): string {
    const list: WeatherSource[] = listAllSources();
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
    switch (appStore.settings.language) {
      case 'zh-CN':
        return '中文';
      case 'en':
        return 'English';
      case 'fr-FR':
        return 'Français';
      case 'ja-JP':
        return '日本語';
      case 'ko-KR':
        return '한국어';
      case 'es-ES':
        return 'Español';
      case 'de-DE':
        return 'Deutsch';
      default:
        return $r('app.string.settings_language_system');
    }
  }
}

/**
 * 和风天气 API Key 配置弹窗。
 */
@CustomDialog
struct QWeatherKeyDialog {
  controller?: CustomDialogController;
  @State input: string = '';
  @State verifying: boolean = false;

  private close(): void {
    if (this.controller) {
      this.controller.close();
    }
  }

  private async save(): Promise<void> {
    const key: string = this.input.trim();
    if (key.length === 0) {
      promptAction.showToast({ message: $r('app.string.qweather_key_empty') });
      return;
    }
    this.verifying = true;
    const ok: boolean = await QWeatherSource.verify(key);
    this.verifying = false;
    if (!ok) {
      promptAction.showToast({ message: $r('app.string.qweather_key_invalid') });
      return;
    }
    await appStore.updateSettings({ qweatherApiKey: key });
    promptAction.showToast({ message: $r('app.string.qweather_key_saved') });
    this.close();
  }

  private async clear(): Promise<void> {
    await appStore.updateSettings({ qweatherApiKey: '' });
    promptAction.showToast({ message: $r('app.string.qweather_key_cleared') });
    this.close();
  }

  build() {
    Column({ space: 12 }) {
      Text($r('app.string.qweather_key_dialog_title'))
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .width('100%')

      Text($r('app.string.qweather_key_dialog_desc'))
        .fontSize(13)
        .fontColor('#595959')
        .lineHeight(19)
        .width('100%')

      TextInput({ placeholder: $r('app.string.qweather_key_hint'), text: this.input })
        .type(InputType.Password)
        .onChange((v: string) => {
          this.input = v;
        })
        .width('100%')

      Row({ space: 8 }) {
        if (appStore.settings.qweatherApiKey.length > 0) {
          Button($r('app.string.action_clear'))
            .layoutWeight(1)
            .onClick(() => {
              this.clear();
            })
        }
        Button($r('app.string.action_cancel'))
          .layoutWeight(1)
          .onClick(() => {
            this.close();
          })
        Button($r('app.string.action_save'))
          .layoutWeight(1)
          .enabled(!this.verifying)
          .onClick(() => {
            this.save();
          })
      }
      .width('100%')
    }
    .padding(20)
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}