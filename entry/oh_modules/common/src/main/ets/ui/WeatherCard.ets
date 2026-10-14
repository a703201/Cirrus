import { TemperatureUnit, MaterialTier } from '../models/Settings';
import { MaterialUtil } from './MaterialUtil';
import { GradientText } from './GradientText';
import { wmoIconKey } from '../models/WmoCode';

/**
 * Reusable current-weather card (state management V2).
 * 卷云·气象拟真（docs/13 §7）：内容卡采用稳定玻璃（`backgroundBlurStyle`）——因官方约束
 * ImmersiveMaterial 对内容区不生效；沉浸光感聚焦于标题栏/底部导航/弹窗。
 * 温度使用数字翻牌 + 渐变字（P1-4）；天气图标使用 erikflowers/weather-icons（MIT，
 * 见 README），资源置于 common 模块 media，文件名与 `wmoIconKey()` 输出一一对应。
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

  private tempText(): string {
    const c: number = this.unit === TemperatureUnit.FAHRENHEIT
      ? Math.round(this.temperature * 9 / 5 + 32)
      : Math.round(this.temperature);
    return `${c}°`;
  }

  /**
   * 天气图标资源：文件名 = `wx_<base>_<day|night>`，与 `wmoIconKey()` 输出一致，
   * 资源置于 common 模块 media（来自 erikflowers/weather-icons，MIT，见 README）。
   */
  private iconResource(): Resource {
    const key: string = wmoIconKey(this.weatherCode, this.isDay);
    return $r('common.media.' + key);
  }

  build() {
    Column() {
      Text(this.locationName)
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
      Row({ space: 8 }) {
        Image(this.iconResource())
          .width(44)
          .height(44)
          .fillColor(this.isDay ? '#3B82F6' : '#7EA6F0')
        GradientText({
          text: this.tempText(),
          fontSize: 72,
          fontWeight: FontWeight.Lighter,
          colors: this.isDay ? ['#1A1A1A', '#3B82F6'] : ['#F2F2F2', '#7EA6F0']
        })
      }
      .alignItems(VerticalAlign.Center)
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
    .backgroundBlurStyle(MaterialUtil.cardBlurStyle(this.materialTier))
    .borderRadius(24)
    .accessibilityGroup(true)
    .accessibilityText(`${this.tempText()} ${this.condition}`)
  }
}
