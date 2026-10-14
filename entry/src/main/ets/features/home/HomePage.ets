import { WeatherCard, wmoDescription, MaterialTier, SkyPalette } from 'common';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';
import { HourlyPage } from './HourlyPage';
import { DailyPage } from './DailyPage';
import { DetailsPage } from './DetailsPage';

@ComponentV2
export struct HomePage {
  @Param scroller: Scroller = new Scroller();
  @Local refreshing: boolean = false;

  private palette(): SkyPalette {
    const code: number = appStore.weather?.current.weatherCode ?? 0;
    const isDay: boolean = appStore.weather?.current.isDay ?? true;
    return themeModel.palette(code, isDay);
  }

  build() {
    Refresh({ refreshing: $$this.refreshing }) {
      Scroll(this.scroller) {
        Column({ space: 12 }) {
          if (appStore.loading) {
            Column() {
              Text($r('app.string.msg_loading'))
                .fontSize(16)
                .fontColor('#6B6B6B')
            }
            .width('100%')
            .height(200)
            .justifyContent(FlexAlign.Center)
          } else if (appStore.weather) {
            WeatherCard({
              temperature: appStore.weather.current.temperature,
              unit: appStore.settings.temperatureUnit,
              condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
              locationName: appStore.currentLocation()?.name ?? '',
              updatedAt: String(appStore.weather.fetchedAt),
              weatherCode: appStore.weather.current.weatherCode,
              isDay: appStore.weather.current.isDay,
              materialTier: appStore.settings.materialLevel
            })
            HourlyPage({
              weather: appStore.weather,
              unit: appStore.settings.temperatureUnit
            })
            DailyPage({
              weather: appStore.weather,
              unit: appStore.settings.temperatureUnit,
              lang: appStore.resolveLang()
            })
            DetailsPage({
              current: appStore.weather.current,
              airQuality: appStore.weather.airQuality,
              unit: appStore.settings.temperatureUnit
            })
          } else if (appStore.error.length > 0) {
            Column() {
              Text($r('app.string.msg_offline'))
                .fontSize(16)
                .fontColor('#6B6B6B')
              Text(appStore.error)
                .fontSize(12)
                .fontColor('#9B9B9B')
                .margin({ top: 4 })
            }
            .width('100%')
            .height(200)
            .justifyContent(FlexAlign.Center)
          } else {
            Column() {
              Text($r('app.string.no_data'))
                .fontSize(16)
                .fontColor('#6B6B6B')
            }
            .width('100%')
            .height(200)
            .justifyContent(FlexAlign.Center)
          }
        }
        .padding(16)
        .width('100%')
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
    }
    .onRefreshing(() => {
      appStore.refresh();
    })
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 180,
      colors: [[this.palette().bgTop, 0.0], [this.palette().bgBottom, 1.0]]
    })
  }
}
