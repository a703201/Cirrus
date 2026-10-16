import { LocationInfo, WeatherData } from 'common';

/**
 * Pluggable weather source contract (接口文档 §1.2).
 * Every source (Open-Meteo, QWeather, ...) implements this and maps its raw
 * response into the normalized WeatherData model so the UI never sees source diffs.
 */
export interface WeatherSource {
  readonly id: string;
  readonly displayName: string;
  readonly needApiKey: boolean;
  readonly enabledByDefault: boolean;
  /** 运行时是否可用（如：需要 Key 的源在用户填入自己的 Key 后才可用）。 */
  isAvailable(): boolean;

  getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData>;
  searchLocation(query: string, lang: string): Promise<LocationInfo[]>;
}