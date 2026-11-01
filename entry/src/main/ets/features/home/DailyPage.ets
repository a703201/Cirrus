import { WeatherData, DailyPoint, wmoDescription, TemperatureUnit, UnitUtil, Tokens } from 'common';

@ComponentV2
export struct DailyPage {
  @Param weather: WeatherData | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param lang: string = 'en';
  @Param dark: boolean = false;

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.label_daily'))
        .fontSize(Tokens.FONT_CAPTION + 1)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.sectionTitle(this.dark))
        .letterSpacing(0.4)
      Column({ space: 2 }) {
        Repeat<DailyPoint>(this.weather?.daily ?? [])
          .each((ri: RepeatItem<DailyPoint>) => {
            Row() {
              Text(ri.item.date)
                .fontSize(Tokens.FONT_CAPTION + 1)
                .fontColor(Tokens.subInk(this.dark))
                .layoutWeight(3)
              Text(wmoDescription(ri.item.weatherCodeDay, this.lang))
                .fontSize(Tokens.FONT_CAPTION + 1)
                .fontColor(Tokens.subInk(this.dark))
                .layoutWeight(4)
              Text(`${UnitUtil.convertTemp(ri.item.tempMin, this.unit)}°`)
                .fontSize(Tokens.FONT_CAPTION + 1)
                .fontColor(Tokens.sectionTitle(this.dark))
              Text(' / ').fontSize(Tokens.FONT_CAPTION + 1).fontColor(Tokens.sectionTitle(this.dark))
              Text(`${UnitUtil.convertTemp(ri.item.tempMax, this.unit)}°`)
                .fontSize(Tokens.FONT_CAPTION + 1)
                .fontWeight(FontWeight.Medium)
                .fontColor(Tokens.ink(this.dark))
            }
            .width('100%')
            .padding({ top: 10, bottom: 10 })
            .accessibilityGroup(true)
          })
          .key((d: DailyPoint) => d.date)
      }
      .width('100%')
      .padding({ left: 14, right: 14, top: 4, bottom: 4 })
      .backgroundColor(Tokens.cardBg(this.dark))
      .borderRadius(Tokens.RADIUS_LG)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}