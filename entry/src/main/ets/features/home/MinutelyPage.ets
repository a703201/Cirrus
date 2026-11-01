import { MinutelyPoint, Tokens } from 'common';

/**
 * 分钟级降水（P2-5）：未来 2 小时短时降水强度条 + 源摘要。无数据时整块不渲染。
 */
@ComponentV2
export struct MinutelyPage {
  @Param minutely: MinutelyPoint[] | undefined = undefined;
  @Param summary: string = '';
  @Param dark: boolean = false;

  private maxPrecip(): number {
    let m: number = 0;
    const list: MinutelyPoint[] = this.minutely ?? [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].precip > m) {
        m = list[i].precip;
      }
    }
    return m;
  }

  private barHeight(p: number): number {
    const max: number = Math.max(this.maxPrecip(), 0.1);
    return Math.max(4, Math.round(44 * p / max));
  }

  build() {
    if ((this.minutely?.length ?? 0) > 0) {
      Column({ space: 10 }) {
        Text($r('app.string.label_minutely'))
          .fontSize(Tokens.FONT_CAPTION + 1)
          .fontWeight(FontWeight.Medium)
          .fontColor(Tokens.sectionTitle(this.dark))
          .letterSpacing(0.4)
        Column({ space: 8 }) {
          if (this.summary.length > 0) {
            Text(this.summary)
              .fontSize(Tokens.FONT_CAPTION + 1)
              .fontColor(Tokens.subInk(this.dark))
              .maxLines(2)
          } else if (this.maxPrecip() <= 0) {
            Text($r('app.string.minutely_no_rain'))
              .fontSize(Tokens.FONT_CAPTION + 1)
              .fontColor(Tokens.subInk(this.dark))
          }
          Row({ space: 3 }) {
            Repeat<MinutelyPoint>(this.minutely ?? [])
              .each((ri: RepeatItem<MinutelyPoint>) => {
                Column()
                  .layoutWeight(1)
                  .height(this.barHeight(ri.item.precip))
                  .backgroundColor(Tokens.accent(this.dark))
                  .borderRadius(3)
              })
              .key((m: MinutelyPoint) => m.time.toString())
          }
          .width('100%')
          .height(48)
          .alignItems(VerticalAlign.Bottom)
        }
        .width('100%')
        .padding(14)
        .backgroundColor(Tokens.cardBg(this.dark))
        .borderRadius(Tokens.RADIUS_LG)
        .alignItems(HorizontalAlign.Start)
        .accessibilityGroup(true)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
  }
}