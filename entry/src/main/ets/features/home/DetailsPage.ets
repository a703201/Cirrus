import { AirQuality, CurrentWeather, TemperatureUnit } from 'common';

@ComponentV2
export struct DetailsPage {
  @Param current: CurrentWeather | undefined = undefined;
  @Param airQuality: AirQuality | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;

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
        .fontSize(15)
        .fontWeight(FontWeight.Medium)
        .fontColor('#3A3A3A')
        .letterSpacing(0.3)
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
        .backgroundColor('rgba(255,255,255,0.5)')
        .borderRadius(20)
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  metric(label: Resource | string, value: string) {
    Column({ space: 4 }) {
      Text(label).fontSize(12).fontColor('#595959')
      Text(value).fontSize(18).fontWeight(FontWeight.Medium).fontColor('#1A1A1A').maxLines(1)
    }
    .padding(12)
    .layoutWeight(1)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(14)
    .alignItems(HorizontalAlign.Start)
    .accessibilityGroup(true)
  }
}
