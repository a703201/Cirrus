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
    source: string;
    fetchedAt: number;
}
