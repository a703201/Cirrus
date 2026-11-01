import { WeatherData, HourlyPoint, DateTimeUtil, TemperatureUnit, UnitUtil, Tokens } from 'common';

@ComponentV2
export struct HourlyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param dark: boolean = false;

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.label_hourly'))
        .fontSize(Tokens.FONT_CAPTION + 1)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.sectionTitle(this.dark))
        .letterSpacing(0.4)
      Scroll() {
        Row({ space: 8 }) {
          Repeat<HourlyPoint>(this.weather?.hourly ?? [])
            .each((ri: RepeatItem<HourlyPoint>) => {
              Column({ space: 6 }) {
                Text(DateTimeUtil.formatHour(ri.item.time))
                  .fontSize(Tokens.FONT_CAPTION)
                  .fontColor(Tokens.subInk(this.dark))
                Text(`${UnitUtil.convertTemp(ri.item.temperature, this.unit)}°`)
                  .fontSize(Tokens.FONT_HEADLINE)
                  .fontWeight(FontWeight.Medium)
                  .fontColor(Tokens.ink(this.dark))
                Text(`${ri.item.precipProb}%`)
                  .fontSize(Tokens.FONT_CAPTION)
                  .fontColor(Tokens.accent(this.dark))
              }
              .padding({ top: 12, bottom: 12, left: 14, right: 14 })
              .backgroundColor(Tokens.cardBg(this.dark))
              .borderRadius(Tokens.RADIUS_MD)
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