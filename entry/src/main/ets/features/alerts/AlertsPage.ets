@ComponentV2
export struct AlertsPage {
  build() {
    Column({ space: 10 }) {
      Text($r('app.string.tab_alerts')).fontSize(20).fontWeight(FontWeight.Medium)
      Text($r('app.string.no_alerts')).fontSize(14).fontColor('#6B6B6B')
    }
    .padding(16)
    .width('100%')
  }
}
