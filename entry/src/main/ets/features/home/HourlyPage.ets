import { WeatherData, HourlyPoint, DateTimeUtil, TemperatureUnit, UnitUtil } from 'common';

@ComponentV2
export struct HourlyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;

  build() {
    Column({ space: 8 }) {
      Text($r('app.string.label_hourly')).fontSize(18).fontWeight(FontWeight.Medium)
      Scroll() {
        Row({ space: 8 }) {
          ForEach(this.weather?.hourly ?? [], (h: HourlyPoint) => {
            Column({ space: 4 }) {
              Text(DateTimeUtil.formatHour(h.time)).fontSize(12).fontColor('#6B6B6B')
              Text(`${UnitUtil.convertTemp(h.temperature, this.unit)}°`).fontSize(16).fontWeight(FontWeight.Medium)
              Text(`${h.precipProb}%`).fontSize(12).fontColor('#3B82F6')
            }
            .padding(10)
            .backgroundColor('rgba(255,255,255,0.5)')
            .borderRadius(12)
          }, (h: HourlyPoint) => h.time.toString())
        }
        .padding({ left: 4, right: 4 })
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
      .width('100%')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}
