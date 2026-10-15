import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import i18n from "@ohos:i18n";
import { DEFAULT_SETTINGS, Log, applyThemeMode } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { AppSettings, LocationInfo, WeatherData } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { WeatherRepository, settingsStore, rdbStore, locationProvider, distributedStore } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
import { NotificationUtil } from "@bundle:com.Lumio.Cirrus/entry/ets/notify/NotificationUtil";
const LOCATION_PERMISSIONS: Permissions[] = ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION'];
/** Seed location so the first launch always shows something (P0). TODO: onboarding. */
const SEED_LOCATION: LocationInfo = {
    id: 'city_shanghai',
    name: 'Shanghai',
    latitude: 31.23,
    longitude: 121.47,
    timezone: 'Asia/Shanghai'
};
/**
 * Global app state + orchestration (state management V2: @ObservedV2 / @Trace).
 * A single instance is shared across the UI (see `appStore` below).
 * 跨设备同步（P1-9）：变更后推送到 distributedStore，组网不可用时静默降级。
 */
@ObservedV2
export class AppStore {
    @Trace
    initialized: boolean = false;
    @Trace
    loading: boolean = false;
    @Trace
    refreshing: boolean = false;
    @Trace
    error: string = '';
    @Trace
    weather: WeatherData | undefined = undefined;
    @Trace
    locations: LocationInfo[] = [];
    @Trace
    currentId: string = '';
    @Trace
    settings: AppSettings = DEFAULT_SETTINGS;
    @Trace
    searchResults: LocationInfo[] = [];
    @Trace
    searching: boolean = false;
    private context: common.UIAbilityContext | undefined = undefined;
    private readonly repo: WeatherRepository = new WeatherRepository();
    async init(context: common.UIAbilityContext): Promise<void> {
        this.context = context;
        try {
            await rdbStore.init(context);
            await settingsStore.init(context);
            await distributedStore.init(context);
        }
        catch (e) {
            Log.e(`store init failed: ${e}`);
        }
        this.settings = await settingsStore.load();
        themeModel.themeMode = this.settings.theme;
        applyThemeMode(this.settings.theme, this.context);
        await NotificationUtil.ensureEnabled(context);
        await this.reloadLocations();
        if (this.locations.length === 0) {
            const remote: LocationInfo[] = await distributedStore.getLocations();
            if (remote.length > 0) {
                for (const loc of remote) {
                    await rdbStore.addLocation(loc);
                }
                await this.reloadLocations();
            }
        }
        if (this.locations.length === 0) {
            await rdbStore.addLocation(SEED_LOCATION);
            await rdbStore.setDefaultLocation(SEED_LOCATION.id);
            await this.reloadLocations();
        }
        this.currentId = await this.resolveDefaultId();
        this.initialized = true;
        await this.refresh();
    }
    private async resolveDefaultId(): Promise<string> {
        const def: string = await rdbStore.getDefaultLocationId();
        if (def.length > 0) {
            return def;
        }
        return this.locations.length > 0 ? this.locations[0].id : '';
    }
    private async reloadLocations(): Promise<void> {
        this.locations = await rdbStore.listLocations();
    }
    private async syncLocations(): Promise<void> {
        await distributedStore.putLocations(this.locations);
    }
    currentLocation(): LocationInfo | undefined {
        return this.locations.find((l: LocationInfo) => l.id === this.currentId);
    }
    resolveLang(): string {
        if (this.settings.language === 'system') {
            const locale: string = i18n.System.getSystemLocaleInstance().toString();
            return locale.split('-')[0];
        }
        return this.settings.language;
    }
    async refresh(): Promise<void> {
        const loc: LocationInfo | undefined = this.currentLocation();
        if (!loc) {
            return;
        }
        this.loading = this.weather === undefined;
        this.refreshing = true;
        this.error = '';
        try {
            this.weather = await this.repo.getWeather(loc, this.resolveLang(), this.settings.sourceId);
            await NotificationUtil.publishAlerts(this.weather);
            await NotificationUtil.publishDailySummary(this.weather);
        }
        catch (e) {
            this.error = `${e}`;
            Log.e(`refresh failed: ${this.error}`);
        }
        finally {
            this.loading = false;
            this.refreshing = false;
        }
    }
    async selectLocation(id: string): Promise<void> {
        if (id === this.currentId) {
            return;
        }
        this.currentId = id;
        this.weather = undefined;
        await this.refresh();
    }
    async useCurrentLocation(): Promise<void> {
        if (!this.context) {
            return;
        }
        try {
            const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
            const result = await atManager.requestPermissionsFromUser(this.context, LOCATION_PERMISSIONS);
            const granted: boolean = result.authResults.every((code: number) => code === 0);
            if (!granted) {
                this.error = 'location permission denied';
                return;
            }
            const raw: LocationInfo = await locationProvider.getCurrentLocation();
            const loc: LocationInfo = {
                id: 'current',
                name: '',
                latitude: raw.latitude,
                longitude: raw.longitude,
                timezone: raw.timezone
            };
            const existing: LocationInfo | undefined = this.locations.find((l: LocationInfo) => l.id === loc.id);
            if (!existing) {
                await rdbStore.addLocation(loc);
                await this.reloadLocations();
                await this.syncLocations();
            }
            await this.selectLocation(loc.id);
        }
        catch (e) {
            this.error = `${e}`;
            Log.e(`useCurrentLocation failed: ${this.error}`);
        }
    }
    async searchLocations(query: string): Promise<void> {
        if (query.length === 0) {
            this.searchResults = [];
            return;
        }
        this.searching = true;
        try {
            this.searchResults = await this.repo.search(query, this.resolveLang(), this.settings.sourceId);
        }
        catch (e) {
            this.error = `${e}`;
            Log.e(`search failed: ${this.error}`);
        }
        finally {
            this.searching = false;
        }
    }
    clearSearch(): void {
        this.searchResults = [];
    }
    async addLocation(loc: LocationInfo): Promise<void> {
        await rdbStore.addLocation(loc);
        await this.reloadLocations();
        await this.syncLocations();
        this.searchResults = [];
        await this.selectLocation(loc.id);
    }
    async removeLocation(id: string): Promise<void> {
        await rdbStore.removeLocation(id);
        await this.reloadLocations();
        await this.syncLocations();
        if (id === this.currentId || this.currentLocation() === undefined) {
            this.currentId = this.locations.length > 0 ? this.locations[0].id : '';
            await this.refresh();
        }
    }
    async setDefaultLocation(id: string): Promise<void> {
        await rdbStore.setDefaultLocation(id);
        await this.reloadLocations();
        await this.syncLocations();
    }
    async updateSettings(patch: Partial<AppSettings>): Promise<void> {
        const next: AppSettings = {
            sourceId: patch.sourceId ?? this.settings.sourceId,
            temperatureUnit: patch.temperatureUnit ?? this.settings.temperatureUnit,
            theme: patch.theme ?? this.settings.theme,
            language: patch.language ?? this.settings.language,
            materialLevel: patch.materialLevel ?? this.settings.materialLevel
        } as AppSettings;
        const sourceChanged: boolean = next.sourceId !== this.settings.sourceId;
        this.settings = next;
        themeModel.themeMode = next.theme;
        applyThemeMode(next.theme, this.context);
        await settingsStore.save(next);
        await distributedStore.putSettings(next);
        if (sourceChanged) {
            this.weather = undefined;
            await this.refresh();
        }
    }
}
export const appStore: AppStore = new AppStore();
