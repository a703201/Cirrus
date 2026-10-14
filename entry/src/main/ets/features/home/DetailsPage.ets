import { AirQuality, CurrentWeather, TemperatureUnit } from 'common';

@ComponentV2
export struct DetailsPage {
  @Param current: CurrentWeather | undefined = undefined;
  @Param airQuality: AirQuality | undefined = undefined;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;

  build() {
    Column({ space: 8 }) {
      Text($r('app.string.label_details')).fontSize(18).fontWeight(FontWeight.Medium)
      if (this.current) {
        Row({ space: 8 }) {
          this.detailCard($r('app.string.label_humidity'), `${this.current.humidity}%`)
          this.detailCard($r('app.string.label_wind'), `${this.current.windSpeed} km/h`)
        }
        Row({ space: 8 }) {
          this.detailCard($r('app.string.label_pressure'), `${this.current.pressure} hPa`)
          this.detailCard($r('app.string.label_uv'), `${this.current.uvIndex}`)
        }
        Row({ space: 8 }) {
          this.detailCard($r('app.string.label_visibility'), `${this.current.visibility} km`)
          this.detailCard($r('app.string.label_cloud'), `${this.current.cloud}%`)
        }
        if (this.airQuality) {
          Row({ space: 8 }) {
            this.detailCard($r('app.string.label_aqi'), `${this.airQuality.aqi}`)
            this.detailCard('PM2.5', `${this.airQuality.pm25}`)
          }
          Row({ space: 8 }) {
            this.detailCard('PM10', `${this.airQuality.pm10}`)
            this.detailCard($r('app.string.label_air_quality'), this.aqiLabel())
          }
        }
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

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

  @Builder
  detailCard(label: Resource | string, value: string) {
    Column({ space: 4 }) {
      Text(label).fontSize(12).fontColor('#595959')
      Text(value).fontSize(16).fontWeight(FontWeight.Medium)
    }
    .padding(10)
    .layoutWeight(1)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .accessibilityGroup(true)

  }
}
