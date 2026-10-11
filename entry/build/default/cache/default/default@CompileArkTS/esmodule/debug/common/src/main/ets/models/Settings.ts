/**
 * App-level settings model (persisted via SettingsStore / Preferences).
 * Kept source-agnostic; UI reads these to drive units / theme / source / language.
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
export interface AppSettings {
    sourceId: string;
    temperatureUnit: TemperatureUnit;
    theme: ThemeMode;
    /** 'system' follows the OS language; otherwise an explicit locale like 'zh-CN'. */
    language: string;
}
export const DEFAULT_SETTINGS: AppSettings = {
    sourceId: 'open-meteo',
    temperatureUnit: TemperatureUnit.CELSIUS,
    theme: ThemeMode.AUTO,
    language: 'system'
};
