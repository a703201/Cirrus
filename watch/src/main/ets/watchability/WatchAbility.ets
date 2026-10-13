import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log } from 'common';

export default class WatchAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    Log.i('WatchAbility.onCreate');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/WatchHome', (err: BusinessError) => {
      if (err.code !== 0) {
        Log.e(`watch loadContent failed: ${err.code} ${err.message}`);
      }
    });
  }
}
