import { distributedKVStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { AppSettings, LocationInfo, Log } from 'common';

const STORE_ID: string = 'cirrus_sync';
const KEY_LOCATIONS: string = 'locations';
const KEY_SETTINGS: string = 'settings';
const BUNDLE_NAME: string = 'com.Lumio.Cirrus';

/**
 * 跨设备同步（P1-9, docs/06 §5）——基于 distributedKVStore（@kit.ArkData）。
 *
 * - 同步「位置列表」与「设置」两类轻量数据；组网不可用时**静默降级**（不影响本地流程）。
 * - **和风 API Key 不参与同步**（见 putSettings），仅存本机 Preferences。
 * - 应用接续（continuation）评估见 docs/12 §3 / docs/06 §5：需 continuationEnabled 与
 *   IAbilityContinuation，列为后续可选增强。
 */
export class DistributedStore {
  private kv: distributedKVStore.SingleKVStore | undefined = undefined;
  private ready: boolean = false;

  async init(context: common.Context): Promise<void> {
    try {
      const config: distributedKVStore.KVManagerConfig = {
        context: context,
        bundleName: BUNDLE_NAME
      };
      const manager: distributedKVStore.KVManager = distributedKVStore.createKVManager(config);
      const options: distributedKVStore.Options = {
        createIfMissing: true,
        encrypt: false,
        backup: false,
        kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
        securityLevel: distributedKVStore.SecurityLevel.S1
      };
      this.kv = await manager.getKVStore<distributedKVStore.SingleKVStore>(STORE_ID, options);
      this.ready = true;
      Log.i('DistributedStore ready');
    } catch (e) {
      this.ready = false;
      Log.w(`DistributedStore unavailable (degraded): ${e}`);
    }
  }

  isReady(): boolean {
    return this.ready;
  }

  async putLocations(locations: LocationInfo[]): Promise<void> {
    if (!this.kv) {
      return;
    }
    try {
      await this.kv.put(KEY_LOCATIONS, JSON.stringify(locations));
    } catch (e) {
      Log.w(`distributed putLocations failed: ${e}`);
    }
  }

  async getLocations(): Promise<LocationInfo[]> {
    if (!this.kv) {
      return [];
    }
    try {
      const raw: string = await this.kv.get(KEY_LOCATIONS) as string;
      return raw ? JSON.parse(raw) as LocationInfo[] : [];
    } catch (e) {
      Log.w(`distributed getLocations failed: ${e}`);
      return [];
    }
  }

  async putSettings(settings: AppSettings): Promise<void> {
    if (!this.kv) {
      return;
    }
    try {
      // 隐私红线（docs/09 §3）：和风 API Key **仅存本机**，绝不进分布式 KV。
      // 同步载荷显式重建并把 qweatherApiKey 置空，避免整对象序列化把 Key 带走。
      const synced: AppSettings = {
        sourceId: settings.sourceId,
        temperatureUnit: settings.temperatureUnit,
        theme: settings.theme,
        language: settings.language,
        materialLevel: settings.materialLevel,
        qweatherApiKey: ''
      };
      await this.kv.put(KEY_SETTINGS, JSON.stringify(synced));
    } catch (e) {
      Log.w(`distributed putSettings failed: ${e}`);
    }
  }

  async getSettings(): Promise<AppSettings | undefined> {
    if (!this.kv) {
      return undefined;
    }
    try {
      const raw: string = await this.kv.get(KEY_SETTINGS) as string;
      return raw ? JSON.parse(raw) as AppSettings : undefined;
    } catch (e) {
      Log.w(`distributed getSettings failed: ${e}`);
      return undefined;
    }
  }
}

export const distributedStore: DistributedStore = new DistributedStore();