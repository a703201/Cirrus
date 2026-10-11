import { WeatherData, LocationInfo, wmoDescription, TemperatureUnit, UnitUtil, Log } from 'common';
import { WeatherRepository } from 'data';
import { i18n } from '@kit.LocalizationKit';

@Entry
@ComponentV2
struct WatchHome {
  @Local temperature: number = 0;
  @Local condition: string = '';

  aboutToAppear(): void {
    this.load();
  }

  private async load(): Promise<void> {
    const repo: WeatherRepository = new WeatherRepository();
    const placeholder: LocationInfo = {
      id: 'city_shanghai',
      name: 'Shanghai',
      latitude: 31.23,
      longitude: 121.47,
      timezone: 'Asia/Shanghai'
    };
    try {
      const data: WeatherData = await repo.getWeather(placeholder, i18n.getSystemLanguage(), 'open-meteo');
      this.temperature = data.current.temperature;
      this.condition = wmoDescription(data.current.weatherCode, i18n.getSystemLanguage());
    } catch (e) {
      Log.e(`watch load failed: ${e}`);
    }
  }

  build() {
    Column({ space: 6 }) {
      Text(this.condition).fontSize(16).fontColor('#A0A0A0')
      Text(`${UnitUtil.convertTemp(this.temperature, TemperatureUnit.CELSIUS)}°`)
        .fontSize(40)
        .fontWeight(FontWeight.Light)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
