import { mediaquery } from '@kit.ArkUI';
import { HomePage } from '../features/home/HomePage';
import { LocationsPage } from '../features/locations/LocationsPage';
import { SettingsPage } from '../features/settings/SettingsPage';

/**
 * App entry page (state management V2). Adapts by breakpoint (多设备适配方案 §2):
 *  - sm/md (<840vp): bottom Tabs (phone / folded)
 *  - lg (>=840vp): Master-Detail (tablet / pc / tv)
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  private listener: mediaquery.MediaQueryListener | undefined = undefined;

  aboutToAppear(): void {
    const listener: mediaquery.MediaQueryListener = this.getUIContext().getMediaQuery().matchMediaSync('(width >= 840vp)');
    this.listener = listener;
    listener.on('change', (mq: mediaquery.MediaQueryResult) => {
      this.isWide = mq.matches;
    });
    this.isWide = listener.matches;
  }

  aboutToDisappear(): void {
    if (this.listener) {
      this.listener.off('change');
    }
  }

  build() {
    if (this.isWide) {
      Row() {
        LocationsPage().width('30%').padding(8)
        HomePage().layoutWeight(1)
      }
      .width('100%')
      .height('100%')
    } else {
      Tabs() {
        TabContent() { HomePage() }.tabBar($r('app.string.tab_home'))
        TabContent() { LocationsPage() }.tabBar($r('app.string.tab_locations'))
        TabContent() { SettingsPage() }.tabBar($r('app.string.tab_settings'))
      }
      .barPosition(BarPosition.End)
      .width('100%')
      .height('100%')
    }
  }
}
