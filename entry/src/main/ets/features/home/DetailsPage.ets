import { AirQuality, CurrentWeather, TemperatureUnit, Tokens } from 'common';

@ComponentV2
export struct DetailsPage {
  @Param current: CurrentWeather | undefined = undefined;
  @Param airQuality: AirQuality | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param dark: boolean = false;

  private aqiLabel(): string {
    const aqi: number = this.airQuality?.aqi ?? 0;
    if (aqi <= 50) {
      return '优';
    }
    if (aqi <= 100) {
      return '良';
    }
    if (aqi <= 150) {
      return '轻度';
    }
    if (aqi <= 200) {
      return '中度';
    }
    if (aqi <= 300) {
      return '重度';
    }
    return '严重';
  }

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.label_details'))
        .fontSize(Tokens.FONT_CAPTION + 1)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.sectionTitle(this.dark))
        .letterSpacing(0.4)
      if (this.current) {
        Column({ space: 10 }) {
          Row({ space: 10 }) {
            this.metric($r('app.string.label_humidity'), `${this.current.humidity}%`)
            this.metric($r('app.string.label_wind'), `${this.current.windSpeed} km/h`)
          }
          Row({ space: 10 }) {
            this.metric($r('app.string.label_pressure'), `${this.current.pressure} hPa`)
            this.metric($r('app.string.label_uv'), `${this.current.uvIndex}`)
          }
          Row({ space: 10 }) {
            this.metric($r('app.string.label_visibility'), `${this.current.visibility} km`)
            this.metric($r('app.string.label_cloud'), `${this.current.cloud}%`)
          }
          if (this.airQuality) {
            Row({ space: 10 }) {
              this.metric($r('app.string.label_aqi'), `${this.airQuality.aqi}`)
              this.metric('PM2.5', `${this.airQuality.pm25}`)
            }
            Row({ space: 10 }) {
              this.metric('PM10', `${this.airQuality.pm10}`)
              this.metric($r('app.string.label_air_quality'), this.aqiLabel())
            }
          }
        }
        .width('100%')
        .padding(14)
        .backgroundColor(Tokens.cardBg(this.dark))
        .borderRadius(Tokens.RADIUS_LG)
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  metric(label: Resource | string, value: string) {
    Column({ space: 4 }) {
      Text(label).fontSize(Tokens.FONT_CAPTION).fontColor(Tokens.subInk(this.dark))
      Text(value)
        .fontSize(Tokens.FONT_HEADLINE + 1)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark))
        .maxLines(1)
    }
    .padding(12)
    .layoutWeight(1)
    .backgroundColor(Tokens.cardBg(this.dark))
    .borderRadius(Tokens.RADIUS_SM)
    .alignItems(HorizontalAlign.Start)
    .accessibilityGroup(true)
  }
}