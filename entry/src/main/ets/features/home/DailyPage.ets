import { WeatherData, DailyPoint, wmoDescription, TemperatureUnit, UnitUtil } from 'common';

@ComponentV2
export struct DailyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param lang: string = 'en';

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.label_daily'))
        .fontSize(15)
        .fontWeight(FontWeight.Medium)
        .fontColor('#3A3A3A')
        .letterSpacing(0.3)
      Column({ space: 2 }) {
        Repeat<DailyPoint>(this.weather?.daily ?? [])
          .each((ri: RepeatItem<DailyPoint>) => {
            Row() {
              Text(ri.item.date).fontSize(14).fontColor('#3F3F3F').layoutWeight(3)
              Text(wmoDescription(ri.item.weatherCodeDay, this.lang))
                .fontSize(14)
                .fontColor('#595959')
                .layoutWeight(4)
              Text(`${UnitUtil.convertTemp(ri.item.tempMin, this.unit)}°`)
                .fontSize(14)
                .fontColor('#7A7A7A')
              Text(' / ').fontSize(14).fontColor('#B0B0B0')
              Text(`${UnitUtil.convertTemp(ri.item.tempMax, this.unit)}°`)
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .fontColor('#1A1A1A')
            }
            .width('100%')
            .padding({ top: 10, bottom: 10 })
            .accessibilityGroup(true)
          })
          .key((d: DailyPoint) => d.date)
      }
      .width('100%')
      .padding({ left: 14, right: 14, top: 4, bottom: 4 })
      .backgroundColor('rgba(255,255,255,0.5)')
      .borderRadius(20)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}
