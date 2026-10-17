/**
 * Normalized weather data model (UI-consumed).
 * Mirrors 接口文档 §2. Every weather source maps its raw response into these types.
 */
export interface LocationInfo {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
    /** 一级行政区（省/直辖市），用于消歧（可选）。 */
    admin1?: string;
    /** 二级行政区（市/区），用于消歧（可选）。 */
    admin2?: string;
    /** 国家/地区（可选）。 */
    country?: string;
}
/** 位置副标题（行政区划），用于搜索结果消歧，如「北京市 · 朝阳区 · 中国」。 */
export function locationSubtitle(loc: LocationInfo): string {
    const parts: string[] = [];
    const a1: string = loc.admin1 ?? '';
    const a2: string = loc.admin2 ?? '';
    const c: string = loc.country ?? '';
    if (a1.length > 0) {
        parts.push(a1);
    }
    if (a2.length > 0 && a2 !== a1) {
        parts.push(a2);
    }
    if (c.length > 0) {
        parts.push(c);
    }
    return parts.join(' · ');
}
export interface CurrentWeather {
    temperature: number;
    apparent: number;
    humidity: number;
    windSpeed: number;
    windDir: number;
    pressure: number;
    cloud: number;
    visibility: number;
    uvIndex: number;
    weatherCode: number;
    isDay: boolean;
    precipProb: number;
}
export interface HourlyPoint {
    time: number;
    temperature: number;
    weatherCode: number;
    precipProb: number;
    precip: number;
    windSpeed: number;
}
export interface DailyPoint {
    date: string;
    tempMax: number;
    tempMin: number;
    weatherCodeDay: number;
    weatherCodeNight: number;
    precipProb: number;
    sunrise: number;
    sunset: number;
    uvIndexMax: number;
}
/** 分钟级降水点（P2-5）：未来 2 小时的短时降水强度（mm）。 */
export interface MinutelyPoint {
    time: number;
    precip: number;
}
export interface AirQuality {
    aqi: number;
    pm25: number;
    pm10: number;
}
export interface WeatherAlert {
    level: string;
    title: string;
    description: string;
    onset: number;
    expires: number;
}
export interface WeatherData {
    location: LocationInfo;
    current: CurrentWeather;
    hourly: HourlyPoint[];
    daily: DailyPoint[];
    airQuality?: AirQuality;
    alerts?: WeatherAlert[];
    /** 分钟级降水（源支持时提供）。 */
    minutely?: MinutelyPoint[];
    /** 源提供的分钟级降水自然语言摘要（如和风 minutely.summary）。 */
    minutelySummary?: string;
    source: string;
    fetchedAt: number;
}
