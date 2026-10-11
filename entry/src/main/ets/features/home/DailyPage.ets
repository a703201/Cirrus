import { WeatherData, DailyPoint, wmoDescription, TemperatureUnit, UnitUtil } from 'common';

@ComponentV2
export struct DailyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param lang: string = 'en';

  build() {
    Column({ space: 8 }) {
      Text($r('app.string.label_daily')).fontSize(18).fontWeight(FontWeight.Medium)
      Column({ space: 6 }) {
        ForEach(this.weather?.daily ?? [], (d: DailyPoint) => {
          Row() {
            Text(d.date).fontSize(14).layoutWeight(1)
            Text(wmoDescription(d.weatherCodeDay, this.lang))
              .fontSize(14)
              .fontColor('#6B6B6B')
              .layoutWeight(2)
            Text(`${UnitUtil.convertTemp(d.tempMin, this.unit)}° / ${UnitUtil.convertTemp(d.tempMax, this.unit)}°`)
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
          }
          .padding(12)
          .backgroundColor('rgba(255,255,255,0.5)')
          .borderRadius(12)
        }, (d: DailyPoint) => d.date)
      }
      .width('100%')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}
