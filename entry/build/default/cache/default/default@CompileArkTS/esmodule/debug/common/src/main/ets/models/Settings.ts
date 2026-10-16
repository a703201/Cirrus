/**
 * App-level settings model (persisted via SettingsStore / Preferences).
 * Kept source-agnostic; UI reads these to drive units / theme / source / language / material tier.
 */
export enum TemperatureUnit {
    CELSIUS = "celsius",
    FAHRENHEIT = "fahrenheit"
}
export enum ThemeMode {
    AUTO = "auto",
    LIGHT = "light",
    DARK = "dark"
}
/** 沉浸光感档位（卷云·气象拟真 §4.1）。AUTO 跟随设备算力。 */
export enum MaterialTier {
    AUTO = "auto",
    EXQUISITE = "exquisite",
    GENTLE = "gentle",
    SMOOTH = "smooth"
}
export interface AppSettings {
    sourceId: string;
    temperatureUnit: TemperatureUnit;
    theme: ThemeMode;
    /** 'system' follows the OS language; otherwise an explicit locale like 'zh-CN'. */
    language: string;
    /** 沉浸光感材质档位。 */
    materialLevel: MaterialTier;
    /** 和风天气 API Key：由用户自填，仅本机持久化（个人开发者场景）。 */
    qweatherApiKey: string;
}
export const DEFAULT_SETTINGS: AppSettings = {
    sourceId: 'open-meteo',
    temperatureUnit: TemperatureUnit.CELSIUS,
    theme: ThemeMode.AUTO,
    language: 'system',
    materialLevel: MaterialTier.AUTO,
    qweatherApiKey: ''
};
