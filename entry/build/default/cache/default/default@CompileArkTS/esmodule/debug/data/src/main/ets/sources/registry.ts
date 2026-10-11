import type { WeatherSource } from './WeatherSource';
import { OpenMeteoSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/OpenMeteoSource";
import { QWeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/QWeatherSource";
// QWeather is instantiated but NOT registered as selectable until it passes the
// compliance gate (隐私文档 §3.1). Users cannot enable it from settings yet.
const ALL_SOURCES: WeatherSource[] = [
    new OpenMeteoSource(),
    new QWeatherSource()
];
export const AVAILABLE_SOURCES: WeatherSource[] = ALL_SOURCES.filter((s) => s.enabledByDefault);
export function getSource(id: string): WeatherSource {
    const found: WeatherSource | undefined = ALL_SOURCES.find((s) => s.id === id);
    return found ?? ALL_SOURCES[0];
}
export function listSources(): WeatherSource[] {
    return AVAILABLE_SOURCES;
}
