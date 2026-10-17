import { LocationInfo, locationSubtitle } from 'common';
import { appStore } from '../../store/AppStore';

@ComponentV2
export struct LocationsPage {
  @Local query: string = '';
  /** true 时作为大屏侧栏（紧凑、无大标题）。 */
  @Param compact: boolean = false;

  private displayName(loc: LocationInfo): ResourceStr {
    return loc.name.length > 0 ? loc.name : $r('app.string.current_location');
  }

  build() {
    Column({ space: 12 }) {
      if (!this.compact) {
        Text($r('app.string.tab_locations')).fontSize(20).fontWeight(FontWeight.Medium)
      }

      Row({ space: 8 }) {
        TextInput({ placeholder: $r('app.string.location_search'), text: this.query })
          .onChange((v: string) => {
            this.query = v;
          })
          .onSubmit(() => {
            appStore.searchLocations(this.query);
          })
          .layoutWeight(1)
        Button($r('app.string.action_search'))
          .onClick(() => {
            appStore.searchLocations(this.query);
          })
      }

      Button($r('app.string.action_locate'))
        .width('100%')
        .onClick(() => {
          appStore.useCurrentLocation();
        })

      if (appStore.error.length > 0) {
        Text(appStore.error).fontSize(12).fontColor('#EF4444')
      }
      if (appStore.searching) {
        Text($r('app.string.msg_loading')).fontSize(14).fontColor('#595959')
      }

      if (appStore.searchResults.length > 0) {
        List({ space: 8 }) {
          Repeat<LocationInfo>(appStore.searchResults)
            .each((ri: RepeatItem<LocationInfo>) => {
              ListItem() {
                Row() {
                  Column({ space: 2 }) {
                    Text(ri.item.name).fontSize(15).fontColor('#1A1A1A')
                    if (locationSubtitle(ri.item).length > 0) {
                      Text(locationSubtitle(ri.item)).fontSize(12).fontColor('#595959')
                    }
                  }
                  .layoutWeight(1)
                  .alignItems(HorizontalAlign.Start)
                  Button($r('app.string.action_add'))
                    .fontSize(12)
                    .onClick(() => {
                      appStore.addLocation(ri.item);
                    })
                }
                .width('100%')
                .padding(14)
                .backgroundColor('rgba(255,255,255,0.6)')
                .borderRadius(14)
              }
            })
            .key((l: LocationInfo) => l.id)
        }
        .width('100%')
        .constraintSize({ maxHeight: 220 })
        .scrollBar(BarState.Off)
      }

      List({ space: 8 }) {
        Repeat<LocationInfo>(appStore.locations)
          .each((ri: RepeatItem<LocationInfo>) => {
            ListItem() {
              Row() {
                Column({ space: 2 }) {
                  Text(this.displayName(ri.item))
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                    .fontColor('#1A1A1A')
                  if (locationSubtitle(ri.item).length > 0) {
                    Text(locationSubtitle(ri.item)).fontSize(12).fontColor('#595959')
                  }
                  if (ri.item.id === appStore.defaultId) {
                    Text($r('app.string.label_default')).fontSize(12).fontColor('#3B82F6')
                  }
                }
                .layoutWeight(1)
                .alignItems(HorizontalAlign.Start)

                Button($r('app.string.action_set_default'))
                  .fontSize(12)
                  .backgroundColor('#3B82F6')
                  .fontColor('#FFFFFF')
                  .visibility(ri.item.id === appStore.defaultId ? Visibility.None : Visibility.Visible)
                  .onClick(() => {
                    appStore.setDefaultLocation(ri.item.id);
                  })
                // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                Button($r('app.string.action_delete'))
                  .fontSize(12)
                  .fontColor('#C5221F')
                  .backgroundColor('rgba(239,68,68,0.12)')
                  .onClick(() => {
                    appStore.removeLocation(ri.item.id);
                  })
              }
              .width('100%')
              .padding(14)
              .backgroundColor(ri.item.id === appStore.currentId ? 'rgba(59,130,246,0.14)' : 'rgba(255,255,255,0.6)')
              .borderRadius(14)
              .borderWidth(ri.item.id === appStore.currentId ? 1 : 0)
              .borderColor('#3B82F6')
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
    .padding({ top: this.compact ? 12 : 44, left: 14, right: 14, bottom: 92 })
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Start)
  }
}
