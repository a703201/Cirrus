import hilog from "@ohos:hilog";
/**
 * Unified log wrapper. Do NOT use console.* / hilog directly elsewhere.
 * Keeps a single tag & domain and a public-format safe logging surface.
 */
export class Log {
    private static readonly DOMAIN: number = 0x0001;
    private static readonly TAG: string = 'Cirrus';
    static d(msg: string): void {
        hilog.debug(Log.DOMAIN, Log.TAG, '%{public}s', msg);
    }
    static i(msg: string): void {
        hilog.info(Log.DOMAIN, Log.TAG, '%{public}s', msg);
    }
    static w(msg: string): void {
        hilog.warn(Log.DOMAIN, Log.TAG, '%{public}s', msg);
    }
    static e(msg: string): void {
        hilog.error(Log.DOMAIN, Log.TAG, '%{public}s', msg);
    }
}
