/**
 * 数字翻牌（P1-4, docs/13 §4.4/§10, docs/11 §5）.
 * Uses `Text.contentTransition(new NumericTextTransition(...))` so the Hero
 * temperature rolls instead of hard-jumping on refresh.
 */
@ComponentV2
export struct AnimatedNumber {
  @Param value: string = '';
  @Param fontSize: number = 72;
  @Param fontWeight: FontWeight = FontWeight.Lighter;
  @Param fontColor: ResourceColor = '#1A1A1A';

  build() {
    Text(this.value)
      .fontSize(this.fontSize)
      .fontWeight(this.fontWeight)
      .fontColor(this.fontColor)
      .contentTransition(new NumericTextTransition({ enableBlur: true }))
  }
}