import pushService from "@hms:core.push.pushService";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
/**
 * 预警推送（P2-3, docs/12 §4）——Push Kit 脚手架，基于 @kit.PushKit。
 *
 * ⚠️ 完整推送链需在 AppGallery Connect 完成：
 *   1. 创建应用并开启推送服务；2. 配置签名证书指纹；3. 在 AGC 侧按 topic 下发预警。
 * 本工程仅做取 Token 与 topic 订阅的脚手架，未配置 AGC 时静默降级。
 */
export class PushService {
    private static token: string = '';
    /** 获取 Push Token（AGC 未配置/无网络时返回空）。 */
    static async init(): Promise<string> {
        try {
            PushService.token = await pushService.getToken();
            Log.i('Push token acquired');
        }
        catch (e) {
            PushService.token = '';
            Log.w(`Push init skipped (AGC not configured?): ${e}`);
        }
        return PushService.token;
    }
    static getToken(): string {
        return PushService.token;
    }
}
