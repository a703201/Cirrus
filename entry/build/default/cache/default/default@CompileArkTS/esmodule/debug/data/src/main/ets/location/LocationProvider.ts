import geoLocationManager from "@ohos:geoLocationManager";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
/**
 * Provides the current (coarse) location. Requires
 * ohos.permission.LOCATION + APPROXIMATELY_LOCATION at runtime (requested by the UI).
 * The returned name is empty; the UI renders a localized "Current location" label.
 */
export class LocationProvider {
    async getCurrentLocation(): Promise<LocationInfo> {
        if (!canIUse('SystemCapability.Location.Location.Core')) {
            throw new Error('location not supported on this device');
        }
        try {
            const loc: geoLocationManager.Location = await geoLocationManager.getCurrentLocation();
            return {
                id: `cur_${loc.latitude}_${loc.longitude}`,
                name: '',
                latitude: loc.latitude,
                longitude: loc.longitude,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
        }
        catch (error) {
            Log.e(`location failed: ${error}`);
            throw new Error(String(error));
        }
    }
}
export const locationProvider: LocationProvider = new LocationProvider();
