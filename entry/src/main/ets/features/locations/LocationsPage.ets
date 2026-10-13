import { LocationInfo } from 'common';
import { appStore } from '../../store/AppStore';

@ComponentV2
export struct LocationsPage {
  @Local query: string = '';
  /** true 时作为大屏侧栏（紧凑、无大标题）。 */
  @Param compact: boolean = false;

  build() {
    Column({ space: 10 }) {
      if (!this.compact) {
        Text($r('app.string.tab_locations')).fontSize(20).fontWeight(FontWeight.Medium)
      }

      Row({ space: 8 }) {
        TextInput({ placeholder: $r('app.string.location_search'), text: this.query })
          .onChange((v: string) => {
            this.query = v;
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

      if (appStore.searching) {
        Text($r('app.string.msg_loading')).fontSize(14).fontColor('#6B6B6B')
      }

      if (appStore.searchResults.length > 0) {
        Text($r('app.string.action_search')).fontSize(14).fontWeight(FontWeight.Medium).fontColor('#4A4A4A')
        List() {
          Repeat<LocationInfo>(appStore.searchResults)
            .each((ri: RepeatItem<LocationInfo>) => {
              ListItem() {
                Row() {
                  Text(ri.item.name).fontSize(16).layoutWeight(1)
                  Button($r('app.string.action_add'))
                    .fontSize(12)
                    .onClick(() => {
                      appStore.addLocation(ri.item);
                    })
                }
                .padding(12)
              }
            })
            .key((loc: LocationInfo) => loc.id)
        }
      }

      Divider().margin({ top: 4, bottom: 4 })

      List() {
        Repeat<LocationInfo>(appStore.locations)
          .each((ri: RepeatItem<LocationInfo>) => {
            ListItem() {
              Row() {
                Column() {
                  Text(ri.item.name).fontSize(16).fontWeight(FontWeight.Medium)
                  if (ri.item.id === appStore.currentId) {
                    Text($r('app.string.label_default'))
                      .fontSize(12)
                      .fontColor('#3B82F6')
                      .margin({ top: 2 })
                  }
                }
                .layoutWeight(1)
                Button($r('app.string.action_set_default'))
                  .fontSize(12)
                  .onClick(() => {
                    appStore.setDefaultLocation(ri.item.id);
                  })
                  .visibility(ri.item.id === appStore.currentId ? Visibility.None : Visibility.Visible)
                Button($r('app.string.action_delete'))
                  .fontSize(12)
                  .fontColor('#EF4444')
                  .onClick(() => {
                    appStore.removeLocation(ri.item.id);
                  })
              }
              .padding(12)
              .onClick(() => {
                appStore.selectLocation(ri.item.id);
              })
            }
          })
          .key((loc: LocationInfo) => loc.id)
      }
      .layoutWeight(1)
    }
    .padding(12)
    .width('100%')
  }
}
