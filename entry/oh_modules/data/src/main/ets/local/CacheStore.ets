import { WeatherData, Log } from 'common';

/**
 * Local cache layer. TODO: back with @ohos.data.relationalStore (RDB) for
 * location/weather persistence, and @ohos.data.distributedKVStore for cross-device
 * sync of locations/settings (架构文档 §3, 多设备文档 §5).
 * In-memory placeholder keeps the repository buildable before RDB wiring.
 */
export class CacheStore {
  private readonly map: Map<string, WeatherData> = new Map<string, WeatherData>();

  private key(locId: string, sourceId: string): string {
    return `${locId}@${sourceId}`;
  }

  get(locId: string, sourceId: string): WeatherData | undefined {
    return this.map.get(this.key(locId, sourceId));
  }

  save(data: WeatherData): void {
    this.map.set(this.key(data.location.id, data.source), data);
    Log.i(`cached ${data.location.name} (source=${data.source})`);
  }
}
