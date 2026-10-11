import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo, WeatherData } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { getSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/sources/registry";
import { rdbStore } from "@bundle:com.Lumio.Cirrus/entry@data/ets/local/RdbStore";
/** Weather freshness window (docs 接口文档 §5.2). */
const NOW_TTL_MS: number = 30 * 60 * 1000;
/**
 * Orchestrates source + cache + refresh policy (架构文档 §3).
 * Offline-first: serve RDB cache when fresh, else fetch & persist.
 */
export class WeatherRepository {
    async getWeather(loc: LocationInfo, lang: string, sourceId: string): Promise<WeatherData> {
        const cached: WeatherData | undefined = await rdbStore.loadWeather(loc.id, sourceId);
        if (cached && this.isFresh(cached.fetchedAt)) {
            Log.i(`cache hit for ${loc.name} via ${sourceId}`);
            return cached;
        }
        try {
            const data: WeatherData = await getSource(sourceId).getCurrentAndForecast(loc, lang);
            await rdbStore.saveWeather(data);
            return data;
        }
        catch (error) {
            Log.e(`fetch failed for ${loc.name}: ${error}`);
            if (cached) {
                return cached;
            }
            throw new Error(String(error));
        }
    }
    async search(query: string, lang: string, sourceId: string): Promise<LocationInfo[]> {
        return getSource(sourceId).searchLocation(query, lang);
    }
    private isFresh(fetchedAt: number, ttlMs: number = NOW_TTL_MS): boolean {
        return Date.now() - fetchedAt < ttlMs;
    }
}
