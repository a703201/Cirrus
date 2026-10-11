import { http } from '@kit.NetworkKit';
import { LocationInfo, WeatherData, HourlyPoint, DailyPoint, Log, UnitUtil } from 'common';
import { WeatherSource } from './WeatherSource';

const BASE_URL: string = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL: string = 'https://geocoding-api.open-meteo.com/v1/search';

interface OmCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  cloud_cover: number;
  visibility: number;
  weather_code: number;
  is_day: number;
  precipitation_probability?: number;
}

interface OmHourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  precipitation: number[];
  wind_speed_10m: number[];
}

interface OmDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

interface OmResponse {
  timezone: string;
  current: OmCurrent;
  hourly: OmHourly;
  daily: OmDaily;
}

interface OmGeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface OmGeoResponse {
  results?: OmGeoResult[];
}

export class OpenMeteoSource implements WeatherSource {
  readonly id: string = 'open-meteo';
  readonly displayName: string = 'Open-Meteo';
  readonly needApiKey: boolean = false;
  readonly enabledByDefault: boolean = true;

  async getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData> {
    const url: string = this.buildForecastUrl(loc);
    const raw: string = await this.request(url);
    return this.toNormalized(loc, raw);
  }

  async searchLocation(query: string, lang: string): Promise<LocationInfo[]> {
    const url: string = `${GEO_URL}?name=${encodeURIComponent(query)}&count=10&language=${this.langToGeo(lang)}&format=json`;
    const raw: string = await this.request(url);
    return this.parseGeo(raw);
  }

  private buildForecastUrl(loc: LocationInfo): string {
    const params: string = [
      `latitude=${loc.latitude}`,
      `longitude=${loc.longitude}`,
      'current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,' +
        'wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,visibility,is_day',
      'hourly=temperature_2m,weather_code,precipitation_probability,precipitation,wind_speed_10m',
      'daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability,sunrise,sunset,uv_index_max',
      'timezone=auto',
      'forecast_days=16',
      'past_days=1',
      'wind_speed_unit=kmh'
    ].join('&');
    return `${BASE_URL}?${params}`;
  }

  private async request(url: string): Promise<string> {
    const req: http.HttpRequest = http.createHttp();
    try {
      const resp: http.HttpResponse = await req.request(url, {
        method: http.RequestMethod.GET,
        connectTimeout: 10000,
        readTimeout: 10000,
        header: { 'Content-Type': 'application/json' }
      });
      if (resp.responseCode !== 200) {
        throw new Error(`Open-Meteo HTTP ${resp.responseCode}`);
      }
      return resp.result as string;
    } catch (e) {
      const msg: string = `Open-Meteo request failed: ${e}`;
      Log.e(msg);
      throw new Error(msg);
    } finally {
      req.destroy();
    }
  }

  private toNormalized(loc: LocationInfo, raw: string): WeatherData {
    const om: OmResponse = JSON.parse(raw) as OmResponse;
    const c: OmCurrent = om.current;
    const hourly: HourlyPoint[] = [];
    const len: number = Math.min(om.hourly.time.length, 48);
    for (let i = 0; i < len; i++) {
      hourly.push({
        time: new Date(om.hourly.time[i]).getTime(),
        temperature: om.hourly.temperature_2m[i],
        weatherCode: om.hourly.weather_code[i],
        precipProb: om.hourly.precipitation_probability[i],
        precip: om.hourly.precipitation[i],
        windSpeed: om.hourly.wind_speed_10m[i]
      });
    }
    const daily: DailyPoint[] = [];
    for (let i = 0; i < om.daily.time.length; i++) {
      daily.push({
        date: om.daily.time[i],
        tempMax: om.daily.temperature_2m_max[i],
        tempMin: om.daily.temperature_2m_min[i],
        weatherCodeDay: om.daily.weather_code[i],
        weatherCodeNight: om.daily.weather_code[i],
        precipProb: om.daily.precipitation_probability[i],
        sunrise: new Date(om.daily.sunrise[i]).getTime(),
        sunset: new Date(om.daily.sunset[i]).getTime(),
        uvIndexMax: om.daily.uv_index_max[i]
      });
    }
    return {
      location: loc,
      current: {
        temperature: c.temperature_2m,
        apparent: c.apparent_temperature,
        humidity: c.relative_humidity_2m,
        windSpeed: c.wind_speed_10m,
        windDir: c.wind_direction_10m,
        pressure: c.surface_pressure,
        cloud: c.cloud_cover,
        visibility: UnitUtil.visibilityMetersToKm(c.visibility),
        uvIndex: 0,
        weatherCode: c.weather_code,
        isDay: c.is_day === 1,
        precipProb: c.precipitation_probability ?? 0
      },
      hourly: hourly,
      daily: daily,
      source: this.id,
      fetchedAt: Date.now()
    };
  }

  private parseGeo(raw: string): LocationInfo[] {
    const obj: OmGeoResponse = JSON.parse(raw) as OmGeoResponse;
    const results: OmGeoResult[] = obj.results ?? [];
    return results.map((r: OmGeoResult): LocationInfo => {
      return {
        id: `om_${r.id}`,
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
        timezone: r.timezone
      };
    });
  }

  private langToGeo(lang: string): string {
    if (lang.startsWith('zh')) {
      return 'zh';
    }
    return lang.split('-')[0];
  }
}
