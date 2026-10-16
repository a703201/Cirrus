import http from "@ohos:net.http";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo, WeatherData, HourlyPoint, DailyPoint, MinutelyPoint, AirQuality, WeatherAlert } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherSource } from './WeatherSource';
import { qweatherIconToWmo } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/QWeatherCodes";
import { QWeatherConfig } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/QWeatherConfig";
const QW_API_ROOT: string = 'https://devapi.qweather.com/v7';
const QW_GEO_ROOT: string = 'https://geoapi.qweather.com/v2';
interface QwNow {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDir: number;
    pressure: number;
    vis: number;
    cloud: number;
    uvIndex: number;
    icon: string;
}
interface QwNowResponse {
    now: QwNow;
}
interface QwHourlyPoint {
    fxTime: string;
    temp: number;
    icon: string;
    pop: string;
    precip: string;
    windSpeed: string;
    windDir: string;
}
interface QwHourlyResponse {
    hourly: QwHourlyPoint[];
}
interface QwDailyPoint {
    fxDate: string;
    tempMax: string;
    tempMin: string;
    iconDay: string;
    pop: string;
    uvIndex: string;
    sunrise: string;
    sunset: string;
}
interface QwDailyResponse {
    daily: QwDailyPoint[];
}
interface QwGeoPoint {
    id: string;
    name: string;
    lat: string;
    lon: string;
    tz: string;
}
interface QwGeoResponse {
    location?: QwGeoPoint[];
}
interface QwAirNow {
    aqi: string;
    pm2p5: string;
    pm10: string;
}
interface QwAirResponse {
    now: QwAirNow;
}
interface QwWarningItem {
    title: string;
    text: string;
    severityColor: string;
    level: string;
    pubTime: string;
}
interface QwWarningResponse {
    warning?: QwWarningItem[];
}
interface QwMinutelyPoint {
    fxTime: string;
    precip: string;
}
interface QwMinutelyResponse {
    summary: string;
    minutely: QwMinutelyPoint[];
}
/**
 * 和风天气源（可选）。
 * 个人开发者场景：API Key 由**用户在设置页自行填入**并仅存本机；
 * 未配置 Key 时 `isAvailable()` 为 false，不出现在可选数据源列表。
 */
export class QWeatherSource implements WeatherSource {
    readonly id: string = 'qweather';
    readonly displayName: string = '和风天气 QWeather';
    readonly needApiKey: boolean = true;
    readonly enabledByDefault: boolean = false;
    isAvailable(): boolean {
        return QWeatherConfig.hasApiKey();
    }
    /** 校验 API Key（调用一次轻量接口），供设置页「保存」时即时反馈。 */
    static async verify(apiKey: string): Promise<boolean> {
        const key: string = apiKey.trim();
        if (key.length === 0) {
            return false;
        }
        const req: http.HttpRequest = http.createHttp();
        try {
            const resp: http.HttpResponse = await req.request(`${QW_API_ROOT}/weather/now?location=101010100`, {
                method: http.RequestMethod.GET,
                header: { 'X-QW-Api-Key': key, 'Content-Type': 'application/json' }
            });
            return resp.responseCode === 200;
        }
        catch (e) {
            Log.w(`QWeather verify failed: ${e}`);
            return false;
        }
        finally {
            req.destroy();
        }
    }
    async getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData> {
        if (!QWeatherConfig.hasApiKey()) {
            throw new Error('QWeather API key not configured');
        }
        const ll: string = `${loc.longitude},${loc.latitude}`;
        const now: string = await this.request(`${QW_API_ROOT}/weather/now?location=${ll}`);
        const hourlyRaw: string = await this.request(`${QW_API_ROOT}/weather/24h?location=${ll}`);
        const dailyRaw: string = await this.request(`${QW_API_ROOT}/weather/7d?location=${ll}`);
        const data: WeatherData = this.toNormalized(loc, now, hourlyRaw, dailyRaw);
        data.airQuality = await this.fetchAir(ll);
        data.alerts = await this.fetchWarnings(ll);
        await this.fillMinutely(ll, data);
        return data;
    }
    async searchLocation(query: string, lang: string): Promise<LocationInfo[]> {
        const raw: string = await this.request(`${QW_GEO_ROOT}/city/lookup?location=${encodeURIComponent(query)}`);
        const obj: QwGeoResponse = JSON.parse(raw) as QwGeoResponse;
        const list: QwGeoPoint[] = obj.location ?? [];
        return list.map((r: QwGeoPoint): LocationInfo => {
            return {
                id: `qw_${r.id}`,
                name: r.name,
                latitude: Number.parseFloat(r.lat),
                longitude: Number.parseFloat(r.lon),
                timezone: r.tz
            };
        });
    }
    private async fillMinutely(ll: string, data: WeatherData): Promise<void> {
        try {
            const raw: string = await this.request(`${QW_API_ROOT}/minutely/5m?location=${ll}`);
            const r: QwMinutelyResponse = JSON.parse(raw) as QwMinutelyResponse;
            data.minutelySummary = r.summary;
            data.minutely = (r.minutely ?? []).map((p: QwMinutelyPoint): MinutelyPoint => {
                return { time: new Date(p.fxTime).getTime(), precip: Number.parseFloat(p.precip) };
            });
        }
        catch (e) {
            Log.w(`QWeather minutely failed: ${e}`);
        }
    }
    private async fetchAir(ll: string): Promise<AirQuality | undefined> {
        try {
            const raw: string = await this.request(`${QW_API_ROOT}/air/now?location=${ll}`);
            const r: QwAirResponse = JSON.parse(raw) as QwAirResponse;
            return {
                aqi: Number.parseInt(r.now.aqi, 10),
                pm25: Number.parseFloat(r.now.pm2p5),
                pm10: Number.parseFloat(r.now.pm10)
            };
        }
        catch (e) {
            Log.w(`QWeather air failed: ${e}`);
            return undefined;
        }
    }
    private async fetchWarnings(ll: string): Promise<WeatherAlert[] | undefined> {
        try {
            const raw: string = await this.request(`${QW_API_ROOT}/warning/now?location=${ll}`);
            const r: QwWarningResponse = JSON.parse(raw) as QwWarningResponse;
            const list: QwWarningItem[] = r.warning ?? [];
            return list.map((w: QwWarningItem): WeatherAlert => {
                return {
                    level: w.level ?? w.severityColor,
                    title: w.title,
                    description: w.text,
                    onset: new Date(w.pubTime).getTime(),
                    expires: 0
                };
            });
        }
        catch (e) {
            Log.w(`QWeather warning failed: ${e}`);
            return undefined;
        }
    }
    private async request(url: string): Promise<string> {
        const req: http.HttpRequest = http.createHttp();
        try {
            const resp: http.HttpResponse = await req.request(url, {
                method: http.RequestMethod.GET,
                header: { 'X-QW-Api-Key': QWeatherConfig.getApiKey(), 'Content-Type': 'application/json' }
            });
            if (resp.responseCode !== 200) {
                throw new Error(`QWeather HTTP ${resp.responseCode}`);
            }
            return resp.result as string;
        }
        catch (e) {
            const msg: string = `QWeather request failed: ${e}`;
            Log.e(msg);
            throw new Error(msg);
        }
        finally {
            req.destroy();
        }
    }
    private toNormalized(loc: LocationInfo, nowRaw: string, hourlyRaw: string, dailyRaw: string): WeatherData {
        const nowResp: QwNowResponse = JSON.parse(nowRaw) as QwNowResponse;
        const hResp: QwHourlyResponse = JSON.parse(hourlyRaw) as QwHourlyResponse;
        const dResp: QwDailyResponse = JSON.parse(dailyRaw) as QwDailyResponse;
        const c: QwNow = nowResp.now;
        const hourly: HourlyPoint[] = hResp.hourly.map((p: QwHourlyPoint): HourlyPoint => {
            return {
                time: new Date(p.fxTime).getTime(),
                temperature: p.temp,
                weatherCode: qweatherIconToWmo(p.icon),
                precipProb: Number.parseInt(p.pop, 10),
                precip: Number.parseFloat(p.precip),
                windSpeed: Number.parseFloat(p.windSpeed)
            };
        });
        const daily: DailyPoint[] = dResp.daily.map((p: QwDailyPoint): DailyPoint => {
            return {
                date: p.fxDate,
                tempMax: Number.parseFloat(p.tempMax),
                tempMin: Number.parseFloat(p.tempMin),
                weatherCodeDay: qweatherIconToWmo(p.iconDay),
                weatherCodeNight: qweatherIconToWmo(p.iconDay),
                precipProb: Number.parseInt(p.pop, 10),
                sunrise: new Date(`${p.fxDate}T${p.sunrise}`).getTime(),
                sunset: new Date(`${p.fxDate}T${p.sunset}`).getTime(),
                uvIndexMax: Number.parseFloat(p.uvIndex)
            };
        });
        return {
            location: loc,
            current: {
                temperature: c.temp,
                apparent: c.feelsLike,
                humidity: c.humidity,
                windSpeed: c.windSpeed,
                windDir: c.windDir,
                pressure: c.pressure,
                cloud: c.cloud,
                visibility: c.vis / 1000,
                uvIndex: c.uvIndex,
                weatherCode: qweatherIconToWmo(c.icon),
                isDay: true,
                precipProb: 0
            },
            hourly: hourly,
            daily: daily,
            source: this.id,
            fetchedAt: Date.now()
        };
    }
}
