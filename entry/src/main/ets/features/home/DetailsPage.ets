import { CurrentWeather, TemperatureUnit, UnitUtil } from 'common';

@ComponentV2
export struct DetailsPage {
  @Param current: CurrentWeather | undefined = undefined;
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
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  detailCard(label: Resource, value: string) {
    Column({ space: 4 }) {
      Text(label).fontSize(12).fontColor('#6B6B6B')
      Text(value).fontSize(16).fontWeight(FontWeight.Medium)
    }
    .padding(10)
    .layoutWeight(1)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
  }
}
