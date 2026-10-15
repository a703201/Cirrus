import { WeatherData, HourlyPoint, DateTimeUtil, TemperatureUnit, UnitUtil } from 'common';

@ComponentV2
export struct HourlyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.label_hourly'))
        .fontSize(15)
        .fontWeight(FontWeight.Medium)
        .fontColor('#3A3A3A')
        .letterSpacing(0.3)
      Scroll() {
        Row({ space: 10 }) {
          Repeat<HourlyPoint>(this.weather?.hourly ?? [])
            .each((ri: RepeatItem<HourlyPoint>) => {
              Column({ space: 6 }) {
                Text(DateTimeUtil.formatHour(ri.item.time)).fontSize(12).fontColor('#595959')
                Text(`${UnitUtil.convertTemp(ri.item.temperature, this.unit)}°`)
                  .fontSize(17)
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#1A1A1A')
                Text(`${ri.item.precipProb}%`).fontSize(12).fontColor('#3B82F6')
              }
              .padding({ top: 12, bottom: 12, left: 14, right: 14 })
              .backgroundColor('rgba(255,255,255,0.55)')
              .borderRadius(18)
              .accessibilityGroup(true)
              .accessibilityText(`${DateTimeUtil.formatHour(ri.item.time)} ${UnitUtil.convertTemp(ri.item.temperature, this.unit)}度 降水概率${ri.item.precipProb}%`)
            })
            .key((h: HourlyPoint) => h.time.toString())
        }
        .padding({ left: 2, right: 2 })
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
      .width('100%')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}
