import { LocationInfo, locationSubtitle, locationTitle, Tokens } from 'common';
import { appStore } from '../../store/AppStore';
import { themeModel } from '../../store/ThemeModel';

/**
 * 位置管理页（重构）。
 * - 普通形态：作为设置入口打开的**二级页**（需求 5），共享元素转场 `geo-locations`（需求 6）；
 * - 紧凑形态：大屏主从布局的侧栏（`compact = true`）。
 * 视觉：分组卡片 + 选中态描边 + 明确可点击行；颜色走 Tokens（夜间可读）。
 */
@ComponentV2
export struct LocationsPage {
  @Local query: string = '';
  @Param compact: boolean = false;

  private dark(): boolean {
    return themeModel.resolveDark();
  }

  private displayName(loc: LocationInfo): ResourceStr {
    return loc.name.length > 0 ? locationTitle(loc) : $r('app.string.current_location');
  }

  build() {
    Column({ space: 14 }) {

      Row({ space: 8 }) {
        TextInput({ placeholder: $r('app.string.location_search'), text: this.query })
          .onChange((v: string) => {
            this.query = v;
          })
          .onSubmit(() => {
            appStore.searchLocations(this.query);
          })
          .layoutWeight(1)
          .backgroundColor(Tokens.cardBg(this.dark()))
          .borderRadius(Tokens.RADIUS_MD)
        Button($r('app.string.action_search'))
          .height(40)
          .borderRadius(Tokens.RADIUS_MD)
          .backgroundColor(Tokens.accent(this.dark()))
          .onClick(() => {
            appStore.searchLocations(this.query);
          })
      }
      .width('100%')

      Button($r('app.string.action_locate'))
        .width('100%')
        .height(44)
        .borderRadius(Tokens.RADIUS_MD)
        .backgroundColor(Tokens.cardBg(this.dark()))
        .fontColor(Tokens.accent(this.dark()))
        .onClick(() => {
          appStore.useCurrentLocation();
        })

      if (appStore.error.length > 0) {
        Text(appStore.error).fontSize(Tokens.FONT_CAPTION).fontColor('#E5484D').width('100%')
      }
      if (appStore.searching) {
        Text($r('app.string.msg_loading')).fontSize(Tokens.FONT_CAPTION).fontColor(Tokens.subInk(this.dark()))
      }

      if (appStore.searchResults.length > 0) {
        Text($r('app.string.action_search'))
          .fontSize(Tokens.FONT_CAPTION)
          .fontColor(Tokens.sectionTitle(this.dark()))
          .letterSpacing(0.4)
          .width('100%')
        List({ space: 8 }) {
          Repeat<LocationInfo>(appStore.searchResults)
            .each((ri: RepeatItem<LocationInfo>) => {
              ListItem() {
                Row() {
                  Column({ space: 2 }) {
                    Text(locationTitle(ri.item))
                      .fontSize(Tokens.FONT_BODY)
                      .fontWeight(FontWeight.Medium)
                      .fontColor(Tokens.ink(this.dark()))
                    if (locationSubtitle(ri.item).length > 0) {
                      Text(locationSubtitle(ri.item))
                        .fontSize(Tokens.FONT_CAPTION)
                        .fontColor(Tokens.subInk(this.dark()))
                    }
                  }
                  .layoutWeight(1)
                  .alignItems(HorizontalAlign.Start)
                  Button($r('app.string.action_add'))
                    .fontSize(Tokens.FONT_CAPTION)
                    .height(32)
                    .borderRadius(Tokens.RADIUS_SM)
                    .backgroundColor(Tokens.accent(this.dark()))
                    .onClick(() => {
                      appStore.addLocation(ri.item);
                    })
                }
                .width('100%')
                .padding(14)
                .backgroundColor(Tokens.cardBg(this.dark()))
                .borderRadius(Tokens.RADIUS_MD)
              }
            })
            .key((l: LocationInfo) => l.id)
        }
        .width('100%')
        .constraintSize({ maxHeight: 240 })
        .scrollBar(BarState.Off)
      }

      List({ space: 8 }) {
        Repeat<LocationInfo>(appStore.locations)
          .each((ri: RepeatItem<LocationInfo>) => {
            ListItem() {
              Row() {
                Column({ space: 2 }) {
                  Text(this.displayName(ri.item))
                    .fontSize(Tokens.FONT_BODY)
                    .fontWeight(FontWeight.Medium)
                    .fontColor(Tokens.ink(this.dark()))
                  if (locationSubtitle(ri.item).length > 0) {
                    Text(locationSubtitle(ri.item))
                      .fontSize(Tokens.FONT_CAPTION)
                      .fontColor(Tokens.subInk(this.dark()))
                  }
                  if (ri.item.id === appStore.defaultId) {
                    Text($r('app.string.label_default'))
                      .fontSize(Tokens.FONT_CAPTION)
                      .fontColor(Tokens.accent(this.dark()))
                  }
                }
                .layoutWeight(1)
                .alignItems(HorizontalAlign.Start)

                Button($r('app.string.action_set_default'))
                  .fontSize(Tokens.FONT_CAPTION)
                  .height(30)
                  .borderRadius(Tokens.RADIUS_SM)
                  .backgroundColor(Tokens.accent(this.dark()))
                  .visibility(ri.item.id === appStore.defaultId ? Visibility.None : Visibility.Visible)
                  .onClick(() => {
                    appStore.setDefaultLocation(ri.item.id);
                  })
                Button($r('app.string.action_delete'))
                  .fontSize(Tokens.FONT_CAPTION)
                  .height(30)
                  .borderRadius(Tokens.RADIUS_SM)
                  .fontColor('#E5484D')
                  .backgroundColor('rgba(229,72,77,0.12)')
                  .onClick(() => {
                    appStore.removeLocation(ri.item.id);
                  })
              }
              .width('100%')
              .padding(14)
              .backgroundColor(Tokens.cardBg(this.dark()))
              .borderRadius(Tokens.RADIUS_MD)
              .borderWidth(ri.item.id === appStore.currentId ? 1.5 : 0)
              .borderColor(Tokens.accent(this.dark()))
              .accessibilityGroup(true)
              .onClick(() => {
                appStore.selectLocation(ri.item.id);
              })
            }
          })
          .key((l: LocationInfo) => l.id)
      }
      .layoutWeight(1)
      .width('100%')
      .scrollBar(BarState.Off)
    }
    .padding({ top: this.compact ? 12 : 60, left: 16, right: 16, bottom: 24 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .geometryTransition('geo-locations')
  }
}