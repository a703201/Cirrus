/**
 * 桌面/锁屏服务卡片 UI（P1-7, PRD F08）。
 *
 * 采用 V1 @Component + @LocalStorageProp：Form 通过 LocalStorage 下发 formBindingData，
 * 卡片用 @LocalStorageProp 读取各字段。注意——@LocalStorageProp 在 @ComponentV2 下被禁用
 * （见 build 红线），故本卡片独立使用 V1 组件，不与 App 的 V2 组件混用。
 * 点击卡片经 postCardAction 拉起主 Ability（碰卡软件同款交互）。
 */
@Entry
@Component
struct WeatherForm {
  @LocalStorageProp('locationName') locationName: string = '';
  @LocalStorageProp('temperature') temperature: string = '--';
  @LocalStorageProp('condition') condition: string = '';
  @LocalStorageProp('tempMax') tempMax: string = '';
  @LocalStorageProp('tempMin') tempMin: string = '';
  @LocalStorageProp('updatedAt') updatedAt: string = '';
  @LocalStorageProp('iconKey') iconKey: string = '';

  build() {
    Column({ space: 6 }) {
      Row() {
        Text(this.locationName)
          .fontSize(12)
          .fontColor('#7A8190')
          .layoutWeight(1)
          .maxLines(1)
          .textAlign(TextAlign.Start)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(this.updatedAt)
          .fontSize(10)
          .fontColor('#9AA0A6')
          .maxLines(1)
      }
      .width('100%')

      Row({ space: 10 }) {
        if (this.iconKey) {
          Image($r('common.media.' + this.iconKey))
            .width(34)
            .height(34)
            .fillColor('#3B82F6')
        }
        Text(this.temperature)
          .fontSize(34)
          .fontWeight(FontWeight.Lighter)
          .fontColor('#1A1A1A')
        Column({ space: 3 }) {
          Text(this.condition)
            .fontSize(13)
            .fontColor('#4A4A4A')
            .maxLines(1)
          Row({ space: 6 }) {
            if (this.tempMax) {
              Text(this.tempMax)
                .fontSize(11)
                .fontColor('#6B6B6B')
            }
            if (this.tempMin) {
              Text(this.tempMin)
                .fontSize(11)
                .fontColor('#6B6B6B')
            }
          }
        }
        .alignItems(HorizontalAlign.Start)
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .height('100%')
    .padding(14)
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#F4F8FD')
    .borderRadius(16)
    .onClick(() => {
      postCardAction(this, {
        action: 'router',
        abilityName: 'EntryAbility',
        params: { targetPage: 'pages/Index' }
      });
    })
  }
}
