import { preferences } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { AppSettings, DEFAULT_SETTINGS, TemperatureUnit, ThemeMode, MaterialTier, Log } from 'common';

const STORE_NAME: string = 'cirrus_settings';
const KEY_SOURCE: string = 'sourceId';
const KEY_UNIT: string = 'temperatureUnit';
const KEY_THEME: string = 'theme';
const KEY_LANGUAGE: string = 'language';
const KEY_MATERIAL: string = 'materialLevel';
const KEY_QWEATHER_KEY: string = 'qweatherApiKey';

/**
 * User settings persistence backed by Preferences (@kit.ArkData).
 * 和风 API Key 由用户自填并仅存本机（个人开发者场景）。
 */
export class SettingsStore {
  private pref: preferences.Preferences | undefined = undefined;

  async init(context: common.Context): Promise<void> {
    try {
      const options: preferences.Options = { name: STORE_NAME };
      this.pref = await preferences.getPreferences(context, options);
      Log.i('SettingsStore ready');
    } catch (e) {
      Log.e(`SettingsStore init failed: ${e}`);
    }
  }

  async load(): Promise<AppSettings> {
    if (!this.pref) {
      return DEFAULT_SETTINGS;
    }
    let sourceId: string = DEFAULT_SETTINGS.sourceId;
    let unit: string = DEFAULT_SETTINGS.temperatureUnit;
    let theme: string = DEFAULT_SETTINGS.theme;
    let language: string = DEFAULT_SETTINGS.language;
    let material: string = DEFAULT_SETTINGS.materialLevel;
    let qweatherKey: string = DEFAULT_SETTINGS.qweatherApiKey;
    try {
      sourceId = await this.pref.get(KEY_SOURCE, DEFAULT_SETTINGS.sourceId) as string;
      unit = await this.pref.get(KEY_UNIT, DEFAULT_SETTINGS.temperatureUnit) as string;
      theme = await this.pref.get(KEY_THEME, DEFAULT_SETTINGS.theme) as string;
      language = await this.pref.get(KEY_LANGUAGE, DEFAULT_SETTINGS.language) as string;
      material = await this.pref.get(KEY_MATERIAL, DEFAULT_SETTINGS.materialLevel) as string;
      qweatherKey = await this.pref.get(KEY_QWEATHER_KEY, DEFAULT_SETTINGS.qweatherApiKey) as string;
    } catch (e) {
      Log.e(`SettingsStore load failed: ${e}`);
    }
    return {
      sourceId: sourceId,
      temperatureUnit: unit as TemperatureUnit,
      theme: theme as ThemeMode,
      language: language,
      materialLevel: material as MaterialTier,
      qweatherApiKey: qweatherKey
    };
  }

  async save(settings: AppSettings): Promise<void> {
    if (!this.pref) {
      return;
    }
    try {
      await this.pref.put(KEY_SOURCE, settings.sourceId);
      await this.pref.put(KEY_UNIT, settings.temperatureUnit);
      await this.pref.put(KEY_THEME, settings.theme);
      await this.pref.put(KEY_LANGUAGE, settings.language);
      await this.pref.put(KEY_MATERIAL, settings.materialLevel);
      await this.pref.put(KEY_QWEATHER_KEY, settings.qweatherApiKey);
      await this.pref.flush();
    } catch (e) {
      Log.e(`SettingsStore save failed: ${e}`);
    }
  }
}

export const settingsStore: SettingsStore = new SettingsStore();