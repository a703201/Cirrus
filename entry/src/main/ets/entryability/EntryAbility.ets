import { UIAbility, AbilityConstant, Want, Configuration, ConfigurationConstant } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log } from 'common';
import { appStore } from '../store/AppStore';
import { themeModel } from '../store/ThemeModel';
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

  /** 系统外观（深浅色）变化（P1-10）。 */
  onConfigurationUpdate(newConfig: Configuration): void {
    this.syncAppearance(newConfig);
  }

  private syncAppearance(config: Configuration): void {
    themeModel.dark = config.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err: BusinessError) => {
      if (err.code !== 0) {
        Log.e(`loadContent failed: ${err.code} ${err.message}`);
      }
    });
  }
}
