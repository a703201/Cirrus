import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type { Configuration } from "@ohos:app.ability.Configuration";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
import { PushService } from "@bundle:com.Lumio.Cirrus/entry/ets/push/PushService";
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
