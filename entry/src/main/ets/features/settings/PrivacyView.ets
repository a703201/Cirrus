/**
 * 数据流向说明 + 隐私政策内嵌（P2-7, docs/09 隐私与权限合规、docs/14 §5）。
 * 二级页面内容组件：由 Index 的 navDestination 以 HdsNavDestination 装载（标题栏 + 返回由
 * NavDestination 提供，不再自带返回头），保证离线可读、可随时访问。
 * 分区与 docs/09 §1~§4 合规矩阵一一对应：数据流向 / 权限使用 / 第三方数据源 / 隐私政策。
 * ⚠️ 正式发布前须以法务终稿复核全部文案（联系方式与生效信息为占位）。
 */
@ComponentV2
export struct PrivacyView {
  build() {
    Column({ space: 12 }) {
      Scroll() {
        Column({ space: 12 }) {
          this.dataFlowCard()
          this.permissionsCard()
          this.thirdPartyCard()
          this.policyCard()

          Text($r('app.string.privacy_meta_note'))
            .fontSize(12)
            .fontColor('#595959')
            .textAlign(TextAlign.Center)
            .width('100%')
        }
        .width('100%')
      }
      .layoutWeight(1)
      .width('100%')
      .scrollBar(BarState.Auto)
    }
    .padding(16)
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
  }

  /** 数据流向：离开设备 / 留存本机 / 跨设备同步 / 预警推送 / 无遥测（docs/09 §1、§2）。 */
  @Builder
  dataFlowCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_data_flow_title')).fontSize(16).fontWeight(FontWeight.Medium)
      this.itemRow($r('app.string.privacy_flow_out_title'), $r('app.string.privacy_flow_out_body'))
      this.itemRow($r('app.string.privacy_flow_local_title'), $r('app.string.privacy_flow_local_body'))
      this.itemRow($r('app.string.privacy_flow_sync_title'), $r('app.string.privacy_flow_sync_body'))
      this.itemRow($r('app.string.privacy_flow_push_title'), $r('app.string.privacy_flow_push_body'))
      this.itemRow($r('app.string.privacy_flow_no_track_title'), $r('app.string.privacy_flow_no_track_body'))
    }
    .width('100%')
    .padding(14)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .alignItems(HorizontalAlign.Start)
  }

  /** 权限使用：与 module.json5 声明一致（INTERNET 必需 / LOCATION 按需 / 通知运行时授权）。 */
  @Builder
  permissionsCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_permissions_title')).fontSize(16).fontWeight(FontWeight.Medium)
      this.itemRow($r('app.string.privacy_perm_internet_title'), $r('app.string.privacy_perm_internet_body'))
      this.itemRow($r('app.string.privacy_perm_location_title'), $r('app.string.privacy_perm_location_body'))
      this.itemRow($r('app.string.privacy_perm_notification_title'), $r('app.string.privacy_perm_notification_body'))
    }
    .width('100%')
    .padding(14)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .alignItems(HorizontalAlign.Start)
  }

  /** 第三方数据源共享边界（docs/09 §3）。 */
  @Builder
  thirdPartyCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_third_party_title')).fontSize(16).fontWeight(FontWeight.Medium)
      this.itemRow($r('app.string.privacy_third_openmeteo_title'), $r('app.string.privacy_third_openmeteo_body'))
      this.itemRow($r('app.string.privacy_third_qweather_title'), $r('app.string.privacy_third_qweather_body'))
    }
    .width('100%')
    .padding(14)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .alignItems(HorizontalAlign.Start)
  }

  /** 隐私政策：收集 / 存储与删除 / 用户权利 / 未成年人 / 跨境 / 联系（docs/09 §4）。 */
  @Builder
  policyCard() {
    Column({ space: 10 }) {
      Text($r('app.string.privacy_policy_title')).fontSize(16).fontWeight(FontWeight.Medium)
      this.itemRow($r('app.string.privacy_policy_collect_title'), $r('app.string.privacy_policy_collect_body'))
      this.itemRow($r('app.string.privacy_policy_storage_title'), $r('app.string.privacy_policy_storage_body'))
      this.itemRow($r('app.string.privacy_policy_rights_title'), $r('app.string.privacy_policy_rights_body'))
      this.itemRow($r('app.string.privacy_policy_minors_title'), $r('app.string.privacy_policy_minors_body'))
      this.itemRow($r('app.string.privacy_policy_cross_border_title'), $r('app.string.privacy_policy_cross_border_body'))
      this.itemRow($r('app.string.privacy_policy_contact_title'), $r('app.string.privacy_policy_contact_body'))
    }
    .width('100%')
    .padding(14)
    .backgroundColor('rgba(255,255,255,0.6)')
    .borderRadius(12)
    .alignItems(HorizontalAlign.Start)
  }

  /** 条款行：标题 + 说明；整行合并朗读（P2-6 无障碍）。 */
  @Builder
  itemRow(label: Resource, body: Resource) {
    Column({ space: 2 }) {
      Text(label).fontSize(14).fontWeight(FontWeight.Medium)
      Text(body).fontSize(13).fontColor('#595959').lineHeight(20)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .accessibilityGroup(true)
  }
}
