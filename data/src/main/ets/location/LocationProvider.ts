import { geoLocationManager } from '@kit.LocationKit';
import { LocationInfo, Log } from 'common';

/**
 * Provides the current (coarse) location. Requires
 * ohos.permission.LOCATION + APPROXIMATELY_LOCATION at runtime (requested by the UI).
 * The returned name is empty; the UI renders a localized "Current location" label.
 */
export class LocationProvider {
  async getCurrentLocation(): Promise<LocationInfo> {
    try {
      const loc: geoLocationManager.Location = await geoLocationManager.getCurrentLocation();
      return {
        id: `cur_${loc.latitude}_${loc.longitude}`,
        name: '',
        latitude: loc.latitude,
        longitude: loc.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      Log.e(`location failed: ${error}`);
      throw error;
    }
  }
}

export const locationProvider: LocationProvider = new LocationProvider();
