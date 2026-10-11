import { TemperatureUnit } from '../models/Settings';
import { UnitUtil } from '../utils/UnitUtil';

/**
 * Reusable glass-style current-weather card (state management V2).
 * Visual: system blur material via `backgroundBlurStyle`; the immersive
 * `systemMaterial` upgrade lands in P1 (see docs/11 §2, docs/12 §3).
 */
@ComponentV2
export struct WeatherCard {
  @Param temperature: number = 0;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param condition: string = '';
  @Param locationName: ResourceStr = '';
  @Param updatedAt: string = '';

  build() {
    Column() {
      Text(this.locationName)
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
      Text(`${UnitUtil.convertTemp(this.temperature, this.unit)}°`)
        .fontSize(72)
        .fontWeight(FontWeight.Lighter)
        .fontColor('#1A1A1A')
        .margin({ top: 6, bottom: 4 })
      Text(this.condition)
        .fontSize(16)
        .fontColor('#4A4A4A')
      if (this.updatedAt.length > 0) {
        Text(this.updatedAt)
          .fontSize(12)
          .fontColor('#6B6B6B')
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .padding(20)
    .backgroundColor('rgba(255,255,255,0.35)')
    .backgroundBlurStyle(BlurStyle.COMPONENT_THICK)
    .borderRadius(24)
  }
}
