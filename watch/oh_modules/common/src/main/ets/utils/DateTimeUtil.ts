/**
 * Time / date formatting helpers. Locale-aware formatting should later move to
 * @ohos.i18n DateTimeFormat; kept simple & dependency-free for the scaffold.
 */

export class DateTimeUtil {
  static formatHour(ts: number): string {
    const date: Date = new Date(ts);
    const h: number = date.getHours();
    const m: number = date.getMinutes();
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  static formatClock(ts: number): string {
    const date: Date = new Date(ts);
    const h: number = date.getHours();
    const m: number = date.getMinutes();
    const s: number = date.getSeconds();
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  static formatDate(dateStr: string): string {
    return dateStr;
  }
}
