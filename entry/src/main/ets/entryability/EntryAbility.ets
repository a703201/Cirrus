import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log } from 'common';
import { appStore } from '../store/AppStore';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    Log.i('EntryAbility.onCreate');
    appStore.init(this.context).catch((e: Object) => {
      Log.e(`appStore.init failed: ${e}`);
    });
  }

  onDestroy(): void {
    Log.i('EntryAbility.onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err: BusinessError) => {
      if (err.code !== 0) {
        Log.e(`loadContent failed: ${err.code} ${err.message}`);
      }
    });
  }
}
