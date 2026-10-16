import type { WeatherSource } from './WeatherSource';
import { OpenMeteoSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/OpenMeteoSource";
import { QWeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/QWeatherSource";
/**
 * 数据源注册表。
 *
 * 个人开发者定位：和风天气（QWeather）为可选源，**用户在设置页填入自己的 API Key 后**
 * 才出现在可选列表；未填 Key 时仅 Open-Meteo 可用。可用性在**运行时**动态判定（`isAvailable()`），
 * 因此不再缓存固定的 AVAILABLE_SOURCES 常量。
 */
const ALL_SOURCES: WeatherSource[] = [
    new OpenMeteoSource(),
    new QWeatherSource()
];
/** 运行时可用源列表。 */
export function listSources(): WeatherSource[] {
    return ALL_SOURCES.filter((s: WeatherSource) => s.isAvailable());
}
/**
 * 全部已注册源（含未配置 Key 的可选源）。
 * 设置页用它展示「和风天气（未配置）」并点击唤起 Key 配置弹窗——否则未配置时该源
 * 不在 `listSources()` 中，用户将无从入口去配置 Key（死锁）。
 */
export function listAllSources(): WeatherSource[] {
    return ALL_SOURCES;
}
/** 取源；请求的源不可用时回落到首个可用源（默认 Open-Meteo）。 */
export function getSource(id: string): WeatherSource {
    const found: WeatherSource | undefined = ALL_SOURCES.find((s: WeatherSource) => s.id === id);
    if (found && found.isAvailable()) {
        return found;
    }
    return ALL_SOURCES[0];
}
