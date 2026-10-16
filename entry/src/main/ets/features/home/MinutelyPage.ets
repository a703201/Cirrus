import { MinutelyPoint } from 'common';

/**
 * 分钟级降水（P2-5, docs/12 §4）：未来 2 小时短时降水强度条 + 源摘要。
 * 无数据（源不支持）时整块不渲染。
 */
@ComponentV2
export struct MinutelyPage {
  @Param minutely: MinutelyPoint[] | undefined = undefined;
  @Param summary: string = '';

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
          .fontSize(15)
          .fontWeight(FontWeight.Medium)
          .fontColor('#3A3A3A')
          .letterSpacing(0.3)
        Column({ space: 8 }) {
          if (this.summary.length > 0) {
            Text(this.summary).fontSize(13).fontColor('#3F3F3F').maxLines(2)
          } else if (this.maxPrecip() <= 0) {
            Text($r('app.string.minutely_no_rain')).fontSize(13).fontColor('#3F3F3F')
          }
          Row({ space: 3 }) {
            Repeat<MinutelyPoint>(this.minutely ?? [])
              .each((ri: RepeatItem<MinutelyPoint>) => {
                Column()
                  .layoutWeight(1)
                  .height(this.barHeight(ri.item.precip))
                  .backgroundColor('#3B82F6')
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
        .backgroundColor('rgba(255,255,255,0.5)')
        .borderRadius(20)
        .alignItems(HorizontalAlign.Start)
        .accessibilityGroup(true)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
  }
}