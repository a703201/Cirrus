import { MaterialTier, wmoDescription, WeatherCard, LocationInfo, SkyPalette, ThemeUtil } from 'common';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';

/**
 * TV 大屏首页（P1-6, docs/06 §3.3）.
 * 焦点驱动：卡片可聚焦 + `List.focusWrapMode` 环形走焦 + 大字可读。
 */
@ComponentV2
export struct TvHome {
  private palette(): SkyPalette {
    const code: number = appStore.weather?.current.weatherCode ?? 0;
    const isDay: boolean = appStore.weather?.current.isDay ?? true;
    return themeModel.palette(code, isDay);
  }

  build() {
    Column({ space: 24 }) {
      Text(appStore.currentLocation()?.name ?? 'Cirrus')
        .fontSize(40)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')

      Row({ space: 32 }) {
        Text(`${appStore.weather?.current.temperature ?? 0}°`)
          .fontSize(112)
          .fontWeight(FontWeight.Lighter)
          .fontColor('#1A1A1A')
        Column({ space: 8 }) {
          Text(wmoDescription(appStore.weather?.current.weatherCode ?? 0, appStore.resolveLang()))
            .fontSize(28)
            .fontColor('#4A4A4A')
          Text(`${appStore.weather?.current.humidity ?? 0}%`)
            .fontSize(24)
            .fontColor('#6B6B6B')
        }
        .alignItems(HorizontalAlign.Start)
      }

      List({ space: 12 }) {
        Repeat<LocationInfo>(appStore.locations)
          .each((ri: RepeatItem<LocationInfo>) => {
            ListItem() {
              Row() {
                Text(ri.item.name).fontSize(28).layoutWeight(1)
                if (ri.item.id === appStore.currentId) {
                  Text($r('app.string.label_default')).fontSize(20).fontColor('#3B82F6')
                }
              }
              .padding(24)
              .backgroundColor('rgba(255,255,255,0.5)')
              .borderRadius(20)
              .focusable(true)
              .onClick(() => {
                appStore.selectLocation(ri.item.id);
              })
            }
          })
          .key((loc: LocationInfo) => loc.id)
      }
      .focusWrapMode(FocusWrapMode.WRAP_WITH_ARROW)
      .layoutWeight(1)
      .width('100%')
    }
    .padding(40)
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .linearGradient({
      angle: 180,
      colors: [[this.palette().bgTop, 0.0], [this.palette().bgBottom, 1.0]]
    })
  }
}