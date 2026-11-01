import { Tokens } from 'common';
import { themeModel } from '../../store/ThemeModel';

/**
 * 数据流向 + 隐私政策（二级页）。标题栏/返回由 HdsNavDestination 原生提供；
 * 共享元素转场 `geo-privacy`（与设置页入口行配对）；颜色走 Tokens（夜间可读）。
 */
@ComponentV2
export struct PrivacyView {
  private dark(): boolean {
    return themeModel.resolveDark();
  }

  build() {
    Column({ space: 12 }) {
      Scroll() {
        Column({ space: 12 }) {
          this.dataFlowCard()
          this.permissionsCard()
          this.thirdPartyCard()
          this.policyCard()

          Text($r('app.string.privacy_meta_note'))
            .fontSize(Tokens.FONT_CAPTION)
            .fontColor(Tokens.sectionTitle(this.dark()))
            .textAlign(TextAlign.Center)
            .width('100%')
        }
        .width('100%')
      }
      .layoutWeight(1)
      .width('100%')
      .scrollBar(BarState.Auto)
    }
    .padding({ top: 60, left: 16, right: 16, bottom: 24 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .geometryTransition('geo-privacy')
  }

  @Builder
  dataFlowCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_data_flow_title'))
        .fontSize(Tokens.FONT_HEADLINE)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark()))
      this.itemRow($r('app.string.privacy_flow_out_title'), $r('app.string.privacy_flow_out_body'))
      this.itemRow($r('app.string.privacy_flow_local_title'), $r('app.string.privacy_flow_local_body'))
      this.itemRow($r('app.string.privacy_flow_sync_title'), $r('app.string.privacy_flow_sync_body'))
      this.itemRow($r('app.string.privacy_flow_push_title'), $r('app.string.privacy_flow_push_body'))
      this.itemRow($r('app.string.privacy_flow_no_track_title'), $r('app.string.privacy_flow_no_track_body'))
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Tokens.cardBg(this.dark()))
    .borderRadius(Tokens.RADIUS_LG)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  permissionsCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_permissions_title'))
        .fontSize(Tokens.FONT_HEADLINE)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark()))
      this.itemRow($r('app.string.privacy_perm_internet_title'), $r('app.string.privacy_perm_internet_body'))
      this.itemRow($r('app.string.privacy_perm_location_title'), $r('app.string.privacy_perm_location_body'))
      this.itemRow($r('app.string.privacy_perm_notification_title'), $r('app.string.privacy_perm_notification_body'))
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Tokens.cardBg(this.dark()))
    .borderRadius(Tokens.RADIUS_LG)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  thirdPartyCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_third_party_title'))
        .fontSize(Tokens.FONT_HEADLINE)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark()))
      this.itemRow($r('app.string.privacy_third_openmeteo_title'), $r('app.string.privacy_third_openmeteo_body'))
      this.itemRow($r('app.string.privacy_third_qweather_title'), $r('app.string.privacy_third_qweather_body'))
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Tokens.cardBg(this.dark()))
    .borderRadius(Tokens.RADIUS_LG)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  policyCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_policy_title'))
        .fontSize(Tokens.FONT_HEADLINE)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark()))
      this.itemRow($r('app.string.privacy_policy_collect_title'), $r('app.string.privacy_policy_collect_body'))
      this.itemRow($r('app.string.privacy_policy_storage_title'), $r('app.string.privacy_policy_storage_body'))
      this.itemRow($r('app.string.privacy_policy_rights_title'), $r('app.string.privacy_policy_rights_body'))
      this.itemRow($r('app.string.privacy_policy_minors_title'), $r('app.string.privacy_policy_minors_body'))
      this.itemRow($r('app.string.privacy_policy_cross_border_title'), $r('app.string.privacy_policy_cross_border_body'))
      this.itemRow($r('app.string.privacy_policy_contact_title'), $r('app.string.privacy_policy_contact_body'))
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Tokens.cardBg(this.dark()))
    .borderRadius(Tokens.RADIUS_LG)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  itemRow(label: Resource, body: Resource) {
    Column({ space: 2 }) {
      Text(label)
        .fontSize(Tokens.FONT_CAPTION + 1)
        .fontWeight(FontWeight.Medium)
        .fontColor(Tokens.ink(this.dark()))
      Text(body)
        .fontSize(Tokens.FONT_CAPTION)
        .fontColor(Tokens.subInk(this.dark()))
        .lineHeight(20)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .accessibilityGroup(true)
  }
}