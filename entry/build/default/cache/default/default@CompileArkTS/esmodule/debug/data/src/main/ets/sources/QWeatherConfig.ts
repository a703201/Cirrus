/**
 * 和风天气（QWeather）API Key 运行时持有者。
 *
 * 个人开发者场景：Key 由**用户在设置页自行填入**，仅本机持久化（Preferences），
 * 不入库、不上传。AppStore 在启动与设置变更时写入；QWeatherSource 读取。
 */
export class QWeatherConfig {
    private static apiKey: string = '';
    static setApiKey(key: string): void {
        QWeatherConfig.apiKey = key.trim();
    }
    static getApiKey(): string {
        return QWeatherConfig.apiKey;
    }
    static hasApiKey(): boolean {
        return QWeatherConfig.apiKey.length > 0;
    }
}
