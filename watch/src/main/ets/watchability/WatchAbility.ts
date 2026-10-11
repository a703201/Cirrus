import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { Log } from 'common';

export default class WatchAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    Log.i('WatchAbility.onCreate');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/WatchHome', (err: { code: number; message: string }) => {
      if (err.code !== 0) {
        Log.e(`watch loadContent failed: ${err.code} ${err.message}`);
      }
    });
  }
}
