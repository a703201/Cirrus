import { TemperatureUnit, MaterialTier } from '../models/Settings';
import { MaterialUtil } from './MaterialUtil';
import { GradientText } from './GradientText';
import { wmoIconKey } from '../models/WmoCode';

/**
 * Hero 天气卡（卷云·气象拟真，docs/13 §7）.
 * - 内容卡采用稳定玻璃（ImmersiveMaterial 对内容区不生效）。
 * - 温度：数字翻牌 + 渐变字；天气图标：weather-icons 字体图（common media）。
 * - 版式：地点 → 大温度+图标 → 现象 → 高低温/体感 → 更新时间（清晰视觉层级）。
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

  private convert(v: number): number {
    return this.unit === TemperatureUnit.FAHRENHEIT ? Math.round(v * 9 / 5 + 32) : Math.round(v);
  }

  private tempText(): string {
    return `${this.convert(this.temperature)}°`;
  }

  /**
   * 天气图标资源：文件名 = `wx_<base>_<day|night>`，与 `wmoIconKey()` 输出一致，
   * 资源置于 common 模块 media（erikflowers/weather-icons，MIT，见 README）。
   */
  private iconResource(): Resource {
    const key: string = wmoIconKey(this.weatherCode, this.isDay);
    return $r('common.media.' + key);
  }

  build() {
    Column({ space: 2 }) {
      Text(this.locationName)
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })

      Row({ space: 12 }) {
        Image(this.iconResource())
          .width(52)
          .height(52)
          .fillColor(this.isDay ? '#3B82F6' : '#7EA6F0')
        GradientText({
          text: this.tempText(),
          fontSize: 88,
          fontWeight: FontWeight.Lighter,
          colors: this.isDay ? ['#1A1A1A', '#3B82F6'] : ['#F2F2F2', '#7EA6F0']
        })
      }
      .alignItems(VerticalAlign.Center)
      .margin({ top: 2 })

      Text(this.condition)
        .fontSize(17)
        .fontColor('#3F3F3F')
        .letterSpacing(0.3)

      if (this.high > -900 && this.low > -900) {
        Row({ space: 12 }) {
          Text(`↑ ${this.convert(this.high)}°`).fontSize(14).fontColor('#3F3F3F')
          Text(`↓ ${this.convert(this.low)}°`).fontSize(14).fontColor('#3F3F3F')
          if (this.apparent > -900) {
            Text(`｜ ${this.convert(this.apparent)}°`).fontSize(14).fontColor('#595959')
          }
        }
        .margin({ top: 8 })
      }

      if (this.updatedAt.length > 0) {
        Text(this.updatedAt)
          .fontSize(12)
          .fontColor('#6B6B6B')
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .padding({ top: 26, bottom: 26, left: 20, right: 20 })
    .backgroundColor('rgba(255,255,255,0.38)')
    .backgroundBlurStyle(MaterialUtil.cardBlurStyle(this.materialTier))
    .borderRadius(28)
    .accessibilityGroup(true)
    .accessibilityText(`${this.tempText()} ${this.condition}`)
  }
}
