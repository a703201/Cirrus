import { WeatherCard, wmoDescription, MaterialTier, SkyPalette, DateTimeUtil } from 'common';
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
        Column({ space: 14 }) {
          if (appStore.error.length > 0 && appStore.weather) {
            Text($r('app.string.msg_offline'))
              .fontSize(12)
              .fontColor('#EF4444')
              .width('100%')
              .textAlign(TextAlign.Center)
          }
          if (appStore.loading) {
            Column() {
              Text($r('app.string.msg_loading'))
                .fontSize(16)
                .fontColor('#595959')
            }
            .width('100%')
            .height(220)
            .justifyContent(FlexAlign.Center)
          } else if (appStore.weather) {
            WeatherCard({
              temperature: appStore.weather.current.temperature,
              unit: appStore.settings.temperatureUnit,
              condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
              locationName: (appStore.currentLocation()?.name ?? '').length > 0
                ? (appStore.currentLocation()?.name ?? '')
                : $r('app.string.current_location'),
              updatedAt: DateTimeUtil.formatHour(appStore.weather.fetchedAt),
              weatherCode: appStore.weather.current.weatherCode,
              isDay: appStore.weather.current.isDay,
              materialTier: appStore.settings.materialLevel,
              high: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMax : -999,
              low: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMin : -999,
              apparent: appStore.weather.current.apparent
            })
            DetailsPage({
              current: appStore.weather.current,
              airQuality: appStore.weather.airQuality,
              unit: appStore.settings.temperatureUnit
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
          } else if (appStore.error.length > 0) {
            Column() {
              Text($r('app.string.msg_offline'))
                .fontSize(16)
                .fontColor('#595959')
              Text(appStore.error)
                .fontSize(12)
                .fontColor('#9B9B9B')
                .margin({ top: 4 })
            }
            .width('100%')
            .height(220)
            .justifyContent(FlexAlign.Center)
          } else {
            Column() {
              Text($r('app.string.no_data'))
                .fontSize(16)
                .fontColor('#595959')
            }
            .width('100%')
            .height(220)
            .justifyContent(FlexAlign.Center)
          }
        }
        .padding({ top: 44, left: 16, right: 16, bottom: 96 })
        .width('100%')
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
    }
    .onRefreshing(() => {
      appStore.refresh().then(() => {
        this.refreshing = false;
      });
    })
    .width('100%')
    .height('100%')
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
    .linearGradient({
      angle: 180,
      colors: [[this.palette().bgTop, 0.0], [this.palette().bgBottom, 1.0]]
    })
  }
}
