/**
 * 渐变文本（P1-4, docs/13 §4.4/§10, docs/11 §5）.
 * Hero temperature uses `Text.shaderStyle` with a linear shader so the number
 * itself carries the sky gradient; combined with the numeric-flip transition.
 *
 * ⚠️ `shaderStyle` / `LinearGradientStyle` 属 API 20+ 新特性，签名以 DevEco 编译期为准。
 */
@ComponentV2
export struct GradientText {
  @Param text: string = '';
  @Param fontSize: number = 72;
  @Param fontWeight: FontWeight = FontWeight.Lighter;
  @Param colors: ResourceColor[] = ['#F59E0B', '#3B82F6'];
  @Param flip: boolean = true;

  /**
   * `LinearGradientStyle` expects color stops `[ResourceColor, number][]` (color + position
   * weight in 0..1), not a bare `ResourceColor[]`. Build evenly spaced stops from the colors.
   */
  private gradientStops(): Array<[ResourceColor, number]> {
    const stops: Array<[ResourceColor, number]> = [];
    const n: number = this.colors.length;
    for (let i = 0; i < n; i++) {
      const weight: number = n > 1 ? i / (n - 1) : 0;
      stops.push([this.colors[i], weight]);
    }
    return stops;
  }

  build() {
    Text(this.text)
      .fontSize(this.fontSize)
      .fontWeight(this.fontWeight)
      .contentTransition(this.flip ? new NumericTextTransition({ enableBlur: true }) : undefined)
      .shaderStyle(new LinearGradientStyle({ colors: this.gradientStops(), direction: GradientDirection.Bottom }))
  }
}