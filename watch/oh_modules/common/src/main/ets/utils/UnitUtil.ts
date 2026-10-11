import { TemperatureUnit } from '../models/Settings';

/**
 * Unit conversions. Open-Meteo returns visibility in meters; normalize to km.
 * Temperature display conversion is driven by the user's unit setting.
 */
export class UnitUtil {
  static visibilityMetersToKm(meters: number): number {
    return meters / 1000;
  }

  static windKmhToMs(kmh: number): number {
    return kmh / 3.6;
  }

  static round1(value: number): number {
    return Math.round(value * 10) / 10;
  }

  static celsiusToFahrenheit(celsius: number): number {
    return celsius * 9 / 5 + 32;
  }

  /** Converts a Celsius value into the given display unit, rounded to integer. */
  static convertTemp(celsius: number, unit: TemperatureUnit): number {
    if (unit === TemperatureUnit.FAHRENHEIT) {
      return Math.round(UnitUtil.celsiusToFahrenheit(celsius));
    }
    return Math.round(celsius);
  }

  static tempSymbol(unit: TemperatureUnit): string {
    return unit === TemperatureUnit.FAHRENHEIT ? '°F' : '°C';
  }
}
