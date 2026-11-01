import { TemperatureUnit, MaterialTier } from '../models/Settings';
import { Tokens } from './DesignTokens';
import { MaterialUtil } from './MaterialUtil';
import { GradientText } from './GradientText';
import { wmoIconKey } from '../models/WmoCode';

/**
 * Hero 天气卡（apple-design × 卷云·气象拟真）。
 * - 字号层级：地点(17 Medium) → 大温度(84 Light) → 现象(16) → 高低温/体感(13)；
 * - 材质：内容面 lighter 半透明；**深色模式自动换深色半透明**，避免浅色叠浅色；
 * - 文本走 Tokens.ink/subInk，夜间与深色模式下保持对比度。
 */
@ComponentV2
export struct WeatherCard {
  @Param temperature: number = 0;
  @Param unit: TemperatureUnit = TemperatureUnit.CELSIUS;
  @Param condition: string = '';
  @Param locationName: ResourceStr = '';
  @Param updatedAt: string = '';
  @Param weatherCode: number = 0;
  @Param isDay: boolean = true;
  @Param materialTier: MaterialTier = MaterialTier.AUTO;
  @Param high: number = -999;
  @Param low: number = -999;
  @Param apparent: number = -999;
  @Param dark: boolean = false;

  private convert(v: number): number {
    return this.unit === TemperatureUnit.FAHRENHEIT ? Math.round(v * 9 / 5 + 32) : Math.round(v);
  }

  private tempText(): string {
    return `${this.convert(this.temperature)}°`;
  }

  private iconResource(): Resource {
    return $r('common.media.' + wmoIconKey(this.weatherCode, this.isDay));
  }

  private tempGradient(): ResourceColor[] {
    if (this.dark) {
      return ['#FFFFFF', '#9FC0FF'];
    }
    return this.isDay ? ['#111417', '#2F6FED'] : ['#F2F4F8', '#7EA6F0'];
  }

  build() {
    Column({ space: 2 }) {
      Text(this.locationName)
        .fontSize(Tokens.FONT_HEADLINE)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark))
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })

      Row({ space: 12 }) {
        Image(this.iconResource())
          .width(48)
          .height(48)
          .fillColor(this.dark ? '#9FC0FF' : '#2F6FED')
        GradientText({
          text: this.tempText(),
          fontSize: Tokens.FONT_DISPLAY,
          fontWeight: FontWeight.Lighter,
          colors: this.tempGradient()
        })
      }
      .alignItems(VerticalAlign.Center)
      .margin({ top: 4 })

      Text(this.condition)
        .fontSize(Tokens.FONT_BODY + 1)
        .fontColor(Tokens.subInk(this.dark))
        .letterSpacing(0.3)

      if (this.high > -900 && this.low > -900) {
        Row({ space: 12 }) {
          Text(`↑ ${this.convert(this.high)}°`).fontSize(Tokens.FONT_CAPTION + 1).fontColor(Tokens.subInk(this.dark))
          Text(`↓ ${this.convert(this.low)}°`).fontSize(Tokens.FONT_CAPTION + 1).fontColor(Tokens.subInk(this.dark))
          if (this.apparent > -900) {
            Text(`｜ ${this.convert(this.apparent)}°`).fontSize(Tokens.FONT_CAPTION + 1).fontColor(Tokens.subInk(this.dark))
          }
        }
        .margin({ top: 10 })
      }

      if (this.updatedAt.length > 0) {
        Text(this.updatedAt)
          .fontSize(11)
          .fontColor(Tokens.subInk(this.dark))
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .padding({ top: 26, bottom: 26, left: 20, right: 20 })
    .backgroundColor(Tokens.cardBg(this.dark))
    .backgroundBlurStyle(MaterialUtil.cardBlurStyle(this.materialTier))
    .borderRadius(Tokens.RADIUS_XL)
    .accessibilityGroup(true)
    .accessibilityText(`${this.tempText()} ${this.condition}`)
  }
}