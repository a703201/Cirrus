import { UIAbility, AbilityConstant, Want, Configuration, ConfigurationConstant } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log, AppSettings, applyAppLanguage } from 'common';
import { settingsStore } from 'data';
import { appStore } from '../store/AppStore';
import { themeModel } from '../store/ThemeModel';
import { SystemBar } from '../system/SystemBar';
import { PushService } from '../push/PushService';

export default class EntryAbility extends UIAbility {
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

  /** 系统外观（深浅色）变化：同步主题并刷新状态栏内容色。 */
  onConfigurationUpdate(newConfig: Configuration): void {
    this.syncAppearance(newConfig);
    SystemBar.setTone(themeModel.resolveDark());
  }

  private syncAppearance(config: Configuration): void {
    themeModel.dark = config.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.enableImmersive(windowStage);
    // i18n 机制：资源按应用首选语言在**启动加载资源时**生效，故必须先应用语言再 loadContent。
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
   * 沉浸式全屏：内容延伸至状态栏/导航栏之下，双栏透明化，内容色随深浅色自适应。
   */
  private enableImmersive(windowStage: window.WindowStage): void {
    try {
      const win: window.Window = windowStage.getMainWindowSync();
      SystemBar.bind(win);
      win.setWindowLayoutFullScreen(true).catch((e: BusinessError) => {
        Log.w(`setWindowLayoutFullScreen failed: ${e.code}`);
      });
    } catch (e) {
      Log.w(`getMainWindowSync failed: ${e}`);
    }
    SystemBar.setTone(themeModel.resolveDark());
  }
}