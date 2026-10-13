import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
import { Log } from "@bundle:com.Lumio.Cirrus/watch@common/ets/common/Index";
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
