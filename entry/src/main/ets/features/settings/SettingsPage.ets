import { promptAction } from '@kit.ArkUI';
import { TemperatureUnit, ThemeMode, MaterialTier } from 'common';
import { listAllSources, WeatherSource, QWeatherSource } from 'data';
import { appStore } from '../../store/AppStore';

/**
 * 设置页（P1-4/P1-10, docs/13 §9）。
 * 单项切换（数据源 / 单位 / 主题 / 材质 / 语言）统一改为下拉菜单（Menu + bindMenu）：
 * bindMenu 按官方样本结构**直接绑定在 build() 内的行容器上**（不放进 @Builder 中转——
 * CustomBuilder 内使用 bindMenu 弹出菜单受限，正是此前菜单点不开的根因），点击行即弹出菜单，
 * 已选项带选中态；选中后通过 `appStore.updateSettings` 持久化。
 * 和风 API Key：仅当数据源为「和风天气」时显示一行，右侧「编辑」按钮唤起配置弹窗
 * （未配置 Key 时该源在菜单里显示为「未配置」，点击直接唤起弹窗，避免无入口的死锁）。
 * 「数据与隐私」经 NavPathStack.pushPath 进入二级页面（HdsNavDestination，见 Index.navDestination）。
 */
@ComponentV2
export struct SettingsPage {
  @Param pageStack: NavPathStack = new NavPathStack();
  /** 和风 API Key 配置弹窗控制器（普通成员，不加 @State）。 */
  private keyDialog: CustomDialogController = new CustomDialogController({
    // ⚠️ builder 必须是**调用形式** `Struct({})`（SDK 官方写法）。传裸 struct 引用会让框架
    // 在 open() 时对它 `new`，而 @CustomDialog struct 不能被 new → 运行时报
    // "TypeError: class constructor cannot call"（17:35 崩溃根因）。
    builder: QWeatherKeyDialog({}),
    alignment: DialogAlignment.Center,
    autoCancel: true
  });

  private openKeyDialog(): void {
    this.keyDialog.open();
  }

  /** 语言切换需冷启动才生效（i18n 资源加载机制），给用户明确提示。 */
  private async setLanguage(lang: string): Promise<void> {
    await appStore.updateSettings({ language: lang });
    promptAction.showToast({ message: $r('app.string.language_restart_hint') });
  }

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

      // 和风天气 API Key：仅在数据源切到和风时出现；右侧「编辑」唤起配置弹窗。
      if (appStore.settings.sourceId === 'qweather') {
        Row({ space: 8 }) {
          Text($r('app.string.settings_qweather_key')).fontSize(16).layoutWeight(1)
          Text($r('app.string.qweather_key_configured')).fontSize(14).fontColor('#666666')
          Text($r('app.string.action_edit'))
            .fontSize(14)
            .fontColor('#3B82F6')
            .padding({ left: 10, right: 10, top: 4, bottom: 4 })
            .onClick(() => {
              this.openKeyDialog();
            })
        }
        .width('100%')
        .padding(14)
        .backgroundColor('rgba(255,255,255,0.6)')
        .borderRadius(12)
        .accessibilityGroup(true)
      }

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
      // 列出全部已注册源：未配置 Key 的和风显示为「未配置」，点击直接唤起配置弹窗
      //（若过滤掉，用户将没有任何入口去填 Key）。
      // content 里的 $r() 必须**就地内联**：经方法间接返回的 Resource 在弹窗的独立
      // 渲染节点上解析不到，框架会报 "MenuItem content or label is empty" 且菜单项无字。
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
      MenuItem({ content: 'English' })
        .selected(appStore.settings.language === 'en')
        .onClick(() => {
          this.setLanguage('en');
        })
      MenuItem({ content: '中文' })
        .selected(appStore.settings.language === 'zh-CN')
        .onClick(() => {
          this.setLanguage('zh-CN');
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
    if (appStore.settings.language === 'en') {
      return 'English';
    }
    if (appStore.settings.language === 'zh-CN') {
      return '中文';
    }
    return $r('app.string.settings_language_system');
  }
}

/**
 * 和风天气 API Key 配置弹窗（设置页「数据源 → 和风天气 → 编辑」唤起）。
 * - `controller` 为普通成员（`@CustomDialog` 下不可加 `@State`）；
 * - 回显已保存的 Key 仅限掩码形式，避免明文暴露；保存前经官方接口校验，仅通过才落盘。
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

  /** 保存：先打一次官方轻量接口校验，**仅校验通过才落盘**（无效或断网均不保存）。 */
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

  /** 清除本机 Key：和风源随即不可用，若正在使用会自动回落默认源。 */
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
