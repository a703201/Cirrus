import { http } from '@kit.NetworkKit';
import { LocationInfo, WeatherData, HourlyPoint, DailyPoint, MinutelyPoint, AirQuality, Log, UnitUtil } from 'common';
import { WeatherSource } from './WeatherSource';

const BASE_URL: string = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL: string = 'https://geocoding-api.open-meteo.com/v1/search';
const AIR_URL: string = 'https://air-quality-api.open-meteo.com/v1/air-quality';

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
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

interface OmMinutely15 {
  time: string[];
  precipitation: number[];
}

interface OmResponse {
  timezone: string;
  current: OmCurrent;
  hourly: OmHourly;
  daily: OmDaily;
  minutely_15?: OmMinutely15;
}

interface OmGeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  admin1?: string;
  admin2?: string;
  country?: string;
}

interface OmGeoResponse {
  results?: OmGeoResult[];
}

interface OmAirCurrent {
  us_aqi: number;
  pm2_5: number;
  pm10: number;
}

interface OmAirResponse {
  current: OmAirCurrent;
}

export class OpenMeteoSource implements WeatherSource {
  readonly id: string = 'open-meteo';
  readonly displayName: string = 'Open-Meteo';
  readonly needApiKey: boolean = false;
  readonly enabledByDefault: boolean = true;

  isAvailable(): boolean {
    return true;
  }

  async getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData> {
    // 坐标防御：NaN / 非有限值会让 Open-Meteo 直接返回 HTTP 400（已实测），先拦在本地。
    if (!Number.isFinite(loc.latitude) || !Number.isFinite(loc.longitude)) {
      throw new Error(`invalid coordinates: ${loc.latitude},${loc.longitude}`);
    }
    const url: string = this.buildForecastUrl(loc);
    const raw: string = await this.request(url);
    const data: WeatherData = this.toNormalized(loc, raw);
    // P2-1: 空气质量（best-effort，失败不影响主流程）。
    data.airQuality = await this.fetchAirQuality(loc);
    return data;
  }

  async searchLocation(query: string, lang: string): Promise<LocationInfo[]> {
    const url: string = `${GEO_URL}?name=${encodeURIComponent(query)}&count=10&language=${this.langToGeo(lang)}&format=json`;
    const raw: string = await this.request(url);
    return this.parseGeo(raw);
  }

  private async fetchAirQuality(loc: LocationInfo): Promise<AirQuality | undefined> {
    try {
      const url: string =
        `${AIR_URL}?latitude=${loc.latitude}&longitude=${loc.longitude}&current=us_aqi,pm2_5,pm10`;
      const raw: string = await this.request(url);
      const r: OmAirResponse = JSON.parse(raw) as OmAirResponse;
      return { aqi: r.current.us_aqi, pm25: r.current.pm2_5, pm10: r.current.pm10 };
    } catch (e) {
      Log.w(`air quality fetch failed: ${e}`);
      return undefined;
    }
  }

  private buildForecastUrl(loc: LocationInfo): string {
    const params: string = [
      `latitude=${loc.latitude}`,
      `longitude=${loc.longitude}`,
      'current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,' +
        'wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,visibility,is_day',
      'hourly=temperature_2m,weather_code,precipitation_probability,precipitation,wind_speed_10m',
      // 注意：daily 没有 precipitation_probability 变量（传了 Open-Meteo 直接 HTTP 400），
      // 日降水概率须用 precipitation_probability_max（单位 %）。hourly/current 的同名变量合法。
      'daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max',
      'minutely_15=precipitation',
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
        precipProb: om.daily.precipitation_probability_max[i],
        sunrise: new Date(om.daily.sunrise[i]).getTime(),
        sunset: new Date(om.daily.sunset[i]).getTime(),
        uvIndexMax: om.daily.uv_index_max[i]
      });
    }
    // P2-5: 分钟级降水（minutely_15，取未来 2 小时 = 前 8 个点；部分模型不提供时为空）。
    const minutely: MinutelyPoint[] = [];
    const m15: OmMinutely15 | undefined = om.minutely_15;
    if (m15) {
      const mlen: number = Math.min(m15.time.length, 8);
      for (let i = 0; i < mlen; i++) {
        minutely.push({ time: new Date(m15.time[i]).getTime(), precip: m15.precipitation[i] });
      }
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
      minutely: minutely,
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
        timezone: r.timezone,
        admin1: r.admin1 ?? '',
        admin2: r.admin2 ?? '',
        country: r.country ?? ''
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