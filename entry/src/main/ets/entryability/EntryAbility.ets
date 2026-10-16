import { UIAbility, AbilityConstant, Want, Configuration, ConfigurationConstant } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log, AppSettings, applyAppLanguage } from 'common';
import { settingsStore } from 'data';
import { appStore } from '../store/AppStore';
import { themeModel } from '../store/ThemeModel';
import { PushService } from '../push/PushService';

export default class EntryAbility extends UIAbility {
  private win: window.Window | undefined = undefined;

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    Log.i('EntryAbility.onCreate');
    this.syncAppearance(this.context.config);
    appStore.init(this.context).catch((e: Object) => {
      Log.e(`appStore.init failed: ${e}`);
    });
    PushService.init();
  }

  onDestroy(): void {
    Log.i('EntryAbility.onDestroy');
  }

  /** 系统外观（深浅色）变化（P1-10）：同步主题并刷新状态栏内容色。 */
  onConfigurationUpdate(newConfig: Configuration): void {
    this.syncAppearance(newConfig);
    this.applySystemBar();
  }

  private syncAppearance(config: Configuration): void {
    themeModel.dark = config.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.enableImmersive(windowStage);
    // i18n 机制：资源按应用首选语言在**启动加载资源时**生效，故必须先应用语言再 loadContent，
    // 否则用户切到英语后即便冷启动，页面文案仍会走系统语言。
    this.prepareLanguage().then(() => {
      windowStage.loadContent('pages/Index', (err: BusinessError) => {
        if (err.code !== 0) {
          Log.e(`loadContent failed: ${err.code} ${err.message}`);
        }
      });
    });
  }

  /** 读取已持久化的语言偏好并登记为应用首选语言（失败静默降级为系统语言）。 */
  private async prepareLanguage(): Promise<void> {
    try {
      await settingsStore.init(this.context);
      const s: AppSettings = await settingsStore.load();
      applyAppLanguage(s.language);
    } catch (e) {
      Log.w(`prepareLanguage failed: ${e}`);
    }
  }

  /**
   * 沉浸式全屏（docs/13 §7「光即材质」）：内容延伸至状态栏/导航栏之下，
   * 状态栏与底部导航栏透明化，内容色随深浅色自适应，消除顶部白条与底部留白。
   */
  private enableImmersive(windowStage: window.WindowStage): void {
    try {
      this.win = windowStage.getMainWindowSync();
      this.win.setWindowLayoutFullScreen(true).catch((e: BusinessError) => {
        Log.w(`setWindowLayoutFullScreen failed: ${e.code}`);
      });
    } catch (e) {
      Log.w(`getMainWindowSync failed: ${e}`);
    }
    this.applySystemBar();
  }

  private applySystemBar(): void {
    if (!this.win) {
      return;
    }
    const content: string = themeModel.resolveDark() ? '#FFFFFF' : '#000000';
    const props: window.SystemBarProperties = {
      statusBarColor: '#00000000',
      statusBarContentColor: content,
      navigationBarColor: '#00000000',
      navigationBarContentColor: content
    };
    this.win.setWindowSystemBarProperties(props).catch((e: BusinessError) => {
      Log.w(`setWindowSystemBarProperties failed: ${e.code}`);
    });
  }
}
