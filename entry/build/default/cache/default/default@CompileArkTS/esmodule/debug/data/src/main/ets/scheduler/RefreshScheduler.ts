import workScheduler from "@ohos:resourceschedule.workScheduler";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
/**
 * Periodic background refresh via WorkScheduler (架构文档 §6).
 * TODO: register a network-typed work task refreshed ≤ 4×/day.
 */
export class RefreshScheduler {
    schedule(): void {
        const workInfo: workScheduler.WorkInfo = {
            workId: 1,
            networkType: workScheduler.NetworkType.NETWORK_TYPE_WIFI,
            isPersisted: true,
            bundleName: 'com.Lumio.Cirrus',
            abilityName: 'EntryAbility'
        };
        try {
            workScheduler.startWork(workInfo);
            Log.i('background refresh scheduled');
        }
        catch (error) {
            Log.e(`schedule failed: ${error}`);
        }
    }
}
