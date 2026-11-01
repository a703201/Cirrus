import { WeatherAlert, Tokens } from 'common';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';

/**
 * 预警（二级页）。标题栏/返回由 HdsNavDestination 原生提供；
 * 共享元素转场 `geo-alerts`（与天气页入口行配对，实现「一镜到底」）；颜色走 Tokens。
 */
@ComponentV2
export struct AlertsPage {
  private dark(): boolean {
    return themeModel.resolveDark();
  }

  build() {
    Column({ space: 12 }) {
      if ((appStore.weather?.alerts?.length ?? 0) === 0) {
        Row() {
          Text($r('app.string.no_alerts'))
            .fontSize(Tokens.FONT_BODY)
            .fontColor(Tokens.subInk(this.dark()))
            .layoutWeight(1)
        }
        .width('100%')
        .padding(16)
        .backgroundColor(Tokens.cardBg(this.dark()))
        .borderRadius(Tokens.RADIUS_LG)
      } else {
        List({ space: 10 }) {
          Repeat<WeatherAlert>(appStore.weather?.alerts ?? [])
            .each((ri: RepeatItem<WeatherAlert>) => {
              ListItem() {
                Column({ space: 8 }) {
                  Row({ space: 8 }) {
                    Text(ri.item.level)
                      .fontSize(Tokens.FONT_CAPTION)
                      .fontColor('#E5484D')
                      .backgroundColor('rgba(229,72,77,0.14)')
                      .borderRadius(6)
                      .padding({ left: 8, right: 8, top: 2, bottom: 2 })
                    Text(ri.item.title)
                      .fontSize(Tokens.FONT_HEADLINE)
                      .fontWeight(FontWeight.Medium)
                      .fontColor(Tokens.ink(this.dark()))
                      .layoutWeight(1)
                  }
                  .width('100%')
                  .alignItems(VerticalAlign.Center)
                  Text(ri.item.description)
                    .fontSize(Tokens.FONT_CAPTION + 1)
                    .fontColor(Tokens.subInk(this.dark()))
                    .lineHeight(20)
                }
                .width('100%')
                .padding(16)
                .backgroundColor(Tokens.cardBg(this.dark()))
                .borderRadius(Tokens.RADIUS_LG)
                .alignItems(HorizontalAlign.Start)
                .accessibilityGroup(true)
                .accessibilityText(`${ri.item.level} ${ri.item.title} ${ri.item.description}`)
              }
            })
            .key((a: WeatherAlert) => a.title)
        }
        .layoutWeight(1)
        .width('100%')
        .scrollBar(BarState.Off)
      }
    }
    .padding({ top: 60, left: 16, right: 16, bottom: 24 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .geometryTransition('geo-alerts')
  }
}