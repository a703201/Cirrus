import { WeatherAlert } from 'common';
import { appStore } from '../../store/AppStore';

@ComponentV2
export struct AlertsPage {
  build() {
    Column({ space: 10 }) {
      Text($r('app.string.tab_alerts')).fontSize(20).fontWeight(FontWeight.Medium)

      if ((appStore.weather?.alerts?.length ?? 0) === 0) {
        Text($r('app.string.no_alerts')).fontSize(14).fontColor('#6B6B6B')
      } else {
        List({ space: 8 }) {
          Repeat<WeatherAlert>(appStore.weather?.alerts ?? [])
            .each((ri: RepeatItem<WeatherAlert>) => {
              ListItem() {
                Column({ space: 4 }) {
                  Row() {
                    Text(ri.item.level)
                      .fontSize(12)
                      .fontColor('#EF4444')
                      .borderRadius(6)
                      .borderWidth(1)
                      .borderColor('#EF4444')
                      .padding({ left: 6, right: 6, top: 1, bottom: 1 })
                    Text(ri.item.title)
                      .fontSize(16)
                      .fontWeight(FontWeight.Medium)
                      .layoutWeight(1)
                      .margin({ left: 8 })
                  }
                  .width('100%')
                  .alignItems(VerticalAlign.Center)
                  Text(ri.item.description)
                    .fontSize(13)
                    .fontColor('#4A4A4A')
                    .margin({ top: 4 })
                }
                .padding(12)
                .backgroundColor('rgba(255,255,255,0.6)')
                .borderRadius(12)
                .width('100%')
                .alignItems(HorizontalAlign.Start)
                .accessibilityGroup(true)
                .accessibilityText(`${ri.item.level} ${ri.item.title} ${ri.item.description}`)
              }
            })
            .key((a: WeatherAlert) => a.title)
        }
        .layoutWeight(1)
        .width('100%')
      }
    }
    .padding(16)
    .width('100%')
  }
}
