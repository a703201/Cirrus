@Entry
@ComponentV2
struct WeatherForm {
  @Local temperature: string = '--';
  @Local condition: string = '';

  build() {
    Column({ space: 4 }) {
      Text(this.condition).fontSize(12).fontColor('#A0A0A0')
      Text(this.temperature).fontSize(28).fontWeight(FontWeight.Lighter)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}