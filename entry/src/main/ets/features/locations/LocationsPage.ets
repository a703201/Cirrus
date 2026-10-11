import { LocationInfo } from 'common';
import { appStore } from '../../store/AppStore';

@ComponentV2
export struct LocationsPage {
  @Local query: string = '';

  build() {
    Column({ space: 10 }) {
      Text($r('app.string.tab_locations')).fontSize(20).fontWeight(FontWeight.Medium)

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
          ForEach(appStore.searchResults, (loc: LocationInfo) => {
            ListItem() {
              Row() {
                Text(loc.name).fontSize(16).layoutWeight(1)
                Button($r('app.string.action_add'))
                  .fontSize(12)
                  .onClick(() => {
                    appStore.addLocation(loc);
                  })
              }
              .padding(12)
            }
          }, (loc: LocationInfo) => loc.id)
        }
      }

      Divider().margin({ top: 4, bottom: 4 })

      List() {
        ForEach(appStore.locations, (loc: LocationInfo) => {
          ListItem() {
            Row() {
              Column() {
                Text(loc.name).fontSize(16).fontWeight(FontWeight.Medium)
                if (loc.id === appStore.currentId) {
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
                  appStore.setDefaultLocation(loc.id);
                })
                .visibility(loc.id === appStore.currentId ? Visibility.None : Visibility.Visible)
              Button($r('app.string.action_delete'))
                .fontSize(12)
                .fontColor('#EF4444')
                .onClick(() => {
                  appStore.removeLocation(loc.id);
                })
            }
            .padding(12)
          }
        }, (loc: LocationInfo) => loc.id)
      }
      .layoutWeight(1)
    }
    .padding(12)
    .width('100%')
  }
}
