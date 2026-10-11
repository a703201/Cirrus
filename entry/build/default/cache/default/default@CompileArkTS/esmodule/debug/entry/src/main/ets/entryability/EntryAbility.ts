import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
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
