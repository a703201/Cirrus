import { TemperatureUnit, MaterialTier } from '../models/Settings';
import { MaterialUtil } from './MaterialUtil';
import { GradientText } from './GradientText';
import { wmoIconKey } from '../models/WmoCode';

/**
 * Reusable current-weather card (state management V2).
 * 卷云·气象拟真（docs/13 §7）：内容卡采用稳定玻璃（`backgroundBlurStyle`）——因官方约束
 * ImmersiveMaterial 对内容区不生效；沉浸光感聚焦于标题栏/底部导航/弹窗。
 * 温度使用数字翻牌 + 渐变字（P1-4）；天气符号使用 SymbolGlyph。
 *
 * ⚠️ `$r('sys.symbol.*')` 名称以系统资源为准，需编译期校验。
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

  private symbol(): Resource {
    const key: string = wmoIconKey(this.weatherCode, this.isDay);
    // NOTE: only the `sys.symbol.*` names validated by the SDK (API 26) resource
    // compiler are used here. The previously referenced cloud_bolt / cloud_rain /
    // cloud_fog / cloud_sun / cloud_moon do NOT exist in this SDK and fail the build.
    if (key.startsWith('wx_clear') || key.startsWith('wx_mainly_clear')) {
      return this.isDay ? $r('sys.symbol.sun_max') : $r('sys.symbol.moon');
    }
    if (key.indexOf('overcast') >= 0) {
      return $r('sys.symbol.cloud');
    }
    if (key.indexOf('thunderstorm') >= 0) {
      return $r('sys.symbol.lightning');
    }
    if (key.indexOf('snow') >= 0) {
      return $r('sys.symbol.snowflake');
    }
    if (key.indexOf('rain') >= 0 || key.indexOf('drizzle') >= 0 || key.indexOf('showers') >= 0) {
      return $r('sys.symbol.umbrella');
    }
    if (key.indexOf('fog') >= 0) {
      return $r('sys.symbol.foggy');
    }
    return this.isDay ? $r('sys.symbol.cloud_and_sun_fill') : $r('sys.symbol.cloud_moon_fill');
  }

  build() {
    Column() {
      Text(this.locationName)
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
      Row({ space: 8 }) {
        SymbolGlyph(this.symbol())
          .fontSize(40)
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
  }
}
