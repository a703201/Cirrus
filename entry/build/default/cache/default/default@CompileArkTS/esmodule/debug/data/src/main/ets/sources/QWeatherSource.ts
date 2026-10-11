import http from "@ohos:net.http";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo, WeatherData, HourlyPoint, DailyPoint } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherSource } from './WeatherSource';
import { qweatherIconToWmo } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/QWeatherCodes";
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
export class QWeatherSource implements WeatherSource {
    readonly id: string = 'qweather';
    readonly displayName: string = '和风天气 QWeather';
    readonly needApiKey: boolean = true;
    readonly enabledByDefault: boolean = false;
    private readonly apiKey: string = '';
    private readonly base: string = 'https://devapi.qweather.com/v7';
    async getCurrentAndForecast(loc: LocationInfo, lang: string): Promise<WeatherData> {
        if (!this.apiKey) {
            throw new Error('QWeather API key not configured (compliance-gated source)');
        }
        const ll: string = `${loc.longitude},${loc.latitude}`;
        const now: string = await this.request(`${this.base}/weather/now?location=${ll}`);
        const hourlyRaw: string = await this.request(`${this.base}/weather/24h?location=${ll}`);
        const dailyRaw: string = await this.request(`${this.base}/weather/7d?location=${ll}`);
        return this.toNormalized(loc, now, hourlyRaw, dailyRaw);
    }
    async searchLocation(query: string, lang: string): Promise<LocationInfo[]> {
        const raw: string = await this.request(`https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(query)}`);
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
    private async request(url: string): Promise<string> {
        const req: http.HttpRequest = http.createHttp();
        try {
            const resp: http.HttpResponse = await req.request(url, {
                method: http.RequestMethod.GET,
                header: { 'X-QW-Api-Key': this.apiKey, 'Content-Type': 'application/json' }
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
