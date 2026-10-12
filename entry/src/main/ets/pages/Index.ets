import { mediaquery } from '@kit.ArkUI';
import {
  HdsNavigation, HdsNavigationTitleMode, HdsTabs, HdsTabsController,
  HideMode, ScrollEffectType, hdsMaterial
} from '@kit.UIDesignKit';
import { MaterialTier } from 'common';
import { appStore } from '../store/AppStore';
import { HomePage } from '../features/home/HomePage';
import { LocationsPage } from '../features/locations/LocationsPage';
import { SettingsPage } from '../features/settings/SettingsPage';

/**
 * App entry page (state management V2) — 卷云·气象拟真（docs/13 §10）.
 * P1-2/P1-3: HdsNavigation（标题栏渐变模糊 + 动态显隐）+ HdsTabs（悬浮胶囊 + 智感握姿）。
 * Adapts by breakpoint: sm/md (<840vp) → bottom HdsTabs; lg (>=840vp) → Master-Detail.
 *
 * ⚠️ HDS 组件与 systemMaterialEffect 属 API 26 新特性；模拟器不支持沉浸视效，须真机验收。
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  private listener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width >= 840vp)');
  private tabController: HdsTabsController = new HdsTabsController();
  private scroller: Scroller = new Scroller();

  aboutToAppear(): void {
    this.listener.on('change', (mq: mediaquery.MediaQueryResult) => {
      this.isWide = mq.matches;
    });
    this.isWide = this.listener.matches;
  }

  aboutToDisappear(): void {
    this.listener.off('change');
  }

  private hdsLevel(): hdsMaterial.MaterialLevel {
    switch (appStore.settings.materialLevel) {
      case MaterialTier.EXQUISITE:
        return hdsMaterial.MaterialLevel.EXQUISITE;
      case MaterialTier.GENTLE:
        return hdsMaterial.MaterialLevel.GENTLE;
      case MaterialTier.SMOOTH:
        return hdsMaterial.MaterialLevel.SMOOTH;
      default:
        return hdsMaterial.MaterialLevel.ADAPTIVE;
    }
  }

  build() {
    HdsNavigation() {
      if (this.isWide) {
        Row() {
          LocationsPage().width('30%').padding(8)
          HomePage({ scroller: this.scroller }).layoutWeight(1)
        }
        .width('100%')
        .height('100%')
      } else {
        HdsTabs({ controller: this.tabController }) {
          TabContent() {
            HomePage({ scroller: this.scroller })
          }.tabBar($r('app.string.tab_home'))

          TabContent() {
            LocationsPage()
          }.tabBar($r('app.string.tab_locations'))

          TabContent() {
            SettingsPage()
          }.tabBar($r('app.string.tab_settings'))
        }
        .scrollable(false)
        .barOverlap(true)
        .vertical(false)
        .barPosition(BarPosition.End)
        .barFloatingStyle({
          adaptToHandedness: true,
          systemMaterialEffect: {
            materialType: hdsMaterial.MaterialType.ADAPTIVE,
            materialLevel: this.hdsLevel()
          }
        })
        .width('100%')
        .height('100%')
      }
    }
    .titleMode(HdsNavigationTitleMode.MINI)
    .hideBackButton(true)
    .titleBar({
      content: {
        title: { mainTitle: 'Cirrus' }
      },
      style: {
        scrollEffectOpts: {
          enableScrollEffect: true,
          scrollEffectType: ScrollEffectType.GRADIENT_BLUR
        },
        systemMaterialEffect: {
          materialType: hdsMaterial.MaterialType.ADAPTIVE,
          materialLevel: this.hdsLevel()
        }
      }
    })
    .dynamicHideTitleBar({
      hideTitleArea: true,
      hideStatusBar: true,
      mode: HideMode.SCROLL_UP_TO
    })
    .bindToScrollable([this.scroller])
    .width('100%')
    .height('100%')
  }
}
