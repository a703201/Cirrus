import { WeatherCard, wmoDescription, SkyPalette, DateTimeUtil, Tokens } from 'common';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';
import { HourlyPage } from './HourlyPage';
import { DailyPage } from './DailyPage';
import { DetailsPage } from './DetailsPage';
import { MinutelyPage } from './MinutelyPage';

@ComponentV2
export struct HomePage {
  @Param scroller: Scroller = new Scroller();
  @Param pageStack: NavPathStack = new NavPathStack();
  @Local refreshing: boolean = false;

  private dark(): boolean {
    return themeModel.resolveDark();
  }

  private palette(): SkyPalette {
    const code: number = appStore.weather?.current.weatherCode ?? 0;
    const isDay: boolean = appStore.weather?.current.isDay ?? true;
    return themeModel.palette(code, isDay);
  }

  build() {
    Refresh({ refreshing: $$this.refreshing }) {
      Scroll(this.scroller) {
        Column({ space: Tokens.SPACE_LG }) {
          if (appStore.error.length > 0 && appStore.weather) {
            Text($r('app.string.msg_offline'))
              .fontSize(Tokens.FONT_CAPTION)
              .fontColor('#E5484D')
              .width('100%')
              .textAlign(TextAlign.Center)
          }
          if (appStore.loading) {
            Column() {
              Text($r('app.string.msg_loading'))
                .fontSize(Tokens.FONT_BODY)
                .fontColor(Tokens.subInk(this.dark()))
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
              apparent: appStore.weather.current.apparent,
              dark: this.dark()
            })

            // 预警入口（二级页）——共享元素转场
            Row({ space: 8 }) {
              Text($r('app.string.tab_alerts'))
                .fontSize(Tokens.FONT_HEADLINE)
                .fontWeight(FontWeight.Medium)
                .fontColor(Tokens.ink(this.dark()))
                .layoutWeight(1)
              Text(`${appStore.weather.alerts?.length ?? 0}`)
                .fontSize(Tokens.FONT_BODY)
                .fontColor((appStore.weather.alerts?.length ?? 0) > 0 ? '#E5484D' : Tokens.subInk(this.dark()))
              Text('›').fontSize(16).fontColor(Tokens.sectionTitle(this.dark())).accessibilityLevel('no')
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 14, bottom: 14 })
            .backgroundColor(Tokens.cardBg(this.dark()))
            .borderRadius(Tokens.RADIUS_LG)
            .accessibilityGroup(true)
            .geometryTransition('geo-alerts')
            .onClick(() => {
              this.pageStack.pushPath({ name: 'Alerts' });
            })

            MinutelyPage({
              minutely: appStore.weather.minutely,
              summary: appStore.weather.minutelySummary ?? '',
              dark: this.dark()
            })
            DetailsPage({
              current: appStore.weather.current,
              airQuality: appStore.weather.airQuality,
              unit: appStore.settings.temperatureUnit,
              dark: this.dark()
            })
            HourlyPage({
              weather: appStore.weather,
              unit: appStore.settings.temperatureUnit,
              dark: this.dark()
            })
            DailyPage({
              weather: appStore.weather,
              unit: appStore.settings.temperatureUnit,
              lang: appStore.resolveLang(),
              dark: this.dark()
            })
          } else if (appStore.error.length > 0) {
            Column() {
              Text($r('app.string.msg_offline'))
                .fontSize(Tokens.FONT_BODY)
                .fontColor(Tokens.subInk(this.dark()))
              Text(appStore.error)
                .fontSize(Tokens.FONT_CAPTION)
                .fontColor(Tokens.sectionTitle(this.dark()))
                .margin({ top: 4 })
            }
            .width('100%')
            .height(220)
            .justifyContent(FlexAlign.Center)
          } else {
            Column() {
              Text($r('app.string.no_data'))
                .fontSize(Tokens.FONT_BODY)
                .fontColor(Tokens.subInk(this.dark()))
            }
            .width('100%')
            .height(220)
            .justifyContent(FlexAlign.Center)
          }
        }
        .padding({ top: 44, left: 16, right: 16, bottom: 108 })
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