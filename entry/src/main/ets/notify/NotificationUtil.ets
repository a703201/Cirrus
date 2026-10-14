import { notificationManager } from '@kit.NotificationKit';
import { common } from '@kit.AbilityKit';
import { WeatherAlert, WeatherData, Log } from 'common';

/**
 * 本地通知（P2-2, docs/12 §4）——每日摘要 + 气象预警，基于 @kit.NotificationKit。
 * 同一内容去重，避免高频重复打扰；失败静默降级。
 */
export class NotificationUtil {
  private static lastAlertKey: string = '';
  private static lastSummaryDay: string = '';

  /** 首次进入时申请通知授权（用户可拒绝，后续静默）。 */
  static async ensureEnabled(context: common.UIAbilityContext): Promise<void> {
    try {
      const enabled: boolean = await notificationManager.isNotificationEnabled();
      if (!enabled) {
        await notificationManager.requestEnableNotification(context);
      }
    } catch (e) {
      Log.w(`notification enable request failed: ${e}`);
    }
  }

  /** 每日摘要：当天仅推送一次。 */
  static async publishDailySummary(data: WeatherData): Promise<void> {
    const day: string = new Date().toDateString();
    if (day === NotificationUtil.lastSummaryDay) {
      return;
    }
    NotificationUtil.lastSummaryDay = day;
    const name: string = data.location.name.length > 0 ? data.location.name : 'Cirrus';
    const temp: number = Math.round(data.current.temperature);
    const title: string = `${name} 天气`;
    const text: string = `当前 ${temp}°，湿度 ${data.current.humidity}%，风速 ${Math.round(data.current.windSpeed)} km/h`;
    await NotificationUtil.publish(1, title, text);
  }

  /** 预警通知：预警集合变化时才推送。 */
  static async publishAlerts(data: WeatherData): Promise<void> {
    const alerts: WeatherAlert[] = data.alerts ?? [];
    if (alerts.length === 0) {
      return;
    }
    const key: string = alerts.map((a: WeatherAlert) => a.title).join('|');
    if (key === NotificationUtil.lastAlertKey) {
      return;
    }
    NotificationUtil.lastAlertKey = key;
    const first: WeatherAlert = alerts[0];
    await NotificationUtil.publish(2, first.title, first.description);
  }

  private static async publish(id: number, title: string, text: string): Promise<void> {
    try {
      await notificationManager.publish({
        id: id,
        content: {
          notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
          normal: {
            title: title,
            text: text,
            additionalText: ''
          }
        }
      });
    } catch (e) {
      Log.w(`notification publish failed: ${e}`);
    }
  }
}