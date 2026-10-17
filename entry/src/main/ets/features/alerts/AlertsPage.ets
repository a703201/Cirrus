import { WeatherAlert } from 'common';
import { appStore } from '../../store/AppStore';

/**
 * 预警（P2-1）——**二级页面**，自绘标题栏（返回 + 标题），布局与设置页一致。
 * 由天气页入口（预警行）经 NavPathStack.pushPath('Alerts') 进入。
 */
@ComponentV2
export struct AlertsPage {
  @Param onBack: () => void = () => {};

  build() {
    Column({ space: 12 }) {
      Row({ space: 8 }) {
        Text('‹')
          .fontSize(26)
          .fontWeight(FontWeight.Medium)
          .accessibilityLevel('no')
          .onClick(() => {
            this.onBack();
          })
        Text($r('app.string.tab_alerts')).fontSize(20).fontWeight(FontWeight.Medium)
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)

      if ((appStore.weather?.alerts?.length ?? 0) === 0) {
        Row() {
          Text($r('app.string.no_alerts')).fontSize(15).fontColor('#595959').layoutWeight(1)
        }
        .width('100%')
        .padding(14)
        .backgroundColor('rgba(255,255,255,0.6)')
        .borderRadius(12)
      } else {
        List({ space: 10 }) {
          Repeat<WeatherAlert>(appStore.weather?.alerts ?? [])
            .each((ri: RepeatItem<WeatherAlert>) => {
              ListItem() {
                Column({ space: 8 }) {
                  Row({ space: 8 }) {
                    Text(ri.item.level)
                      .fontSize(12)
                      .fontColor('#C5221F')
                      .backgroundColor('rgba(239,68,68,0.12)')
                      .borderRadius(6)
                      .padding({ left: 8, right: 8, top: 2, bottom: 2 })
                    Text(ri.item.title)
                      .fontSize(16)
                      .fontWeight(FontWeight.Medium)
                      .layoutWeight(1)
                  }
                  .width('100%')
                  .alignItems(VerticalAlign.Center)
                  Text(ri.item.description)
                    .fontSize(13)
                    .fontColor('#595959')
                    .lineHeight(20)
                }
                .width('100%')
                .padding(14)
                .backgroundColor('rgba(255,255,255,0.6)')
                .borderRadius(12)
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
    .padding({ top: 44, left: 16, right: 16, bottom: 24 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
  }
}