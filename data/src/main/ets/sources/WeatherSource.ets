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

  getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData>;
  searchLocation(query: string, lang: string): Promise<LocationInfo[]>;
}
