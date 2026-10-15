import { mediaquery } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import {
  HdsNavigation, HdsNavDestination, HdsTabs, HdsTabsController,
  hdsMaterial
} from '@kit.UIDesignKit';
import { MaterialTier } from 'common';
import { appStore } from '../store/AppStore';
import { uiState } from '../store/UiState';
import { HomePage } from '../features/home/HomePage';
import { LocationsPage } from '../features/locations/LocationsPage';
import { AlertsPage } from '../features/alerts/AlertsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { PrivacyView } from '../features/settings/PrivacyView';
import { TvHome } from '../features/tv/TvHome';

/**
 * App entry page (state management V2) — 卷云·气象拟真（docs/13 §10）.
 * - P1-2: HdsTabs（悬浮胶囊 + 智感握姿）。
 * - P1-5: 大屏（>=840vp）主从布局；Pura X 外屏等窄屏（<600vp）单列。
 * - P1-6: TV 走焦点式 TvHome。
 * - P2-1: 新增「预警」页签。
 * - 二级页面：NavPathStack + navDestination（「数据与隐私」等 push 页面）。
 *
 * 折叠屏修复：HdsNavigation 显式设为 `NavigationMode.Stack`——否则展开态默认分栏（Split）
 * 会把内容挤在左侧导航栏、右侧留白。（本次修复项）
 * ⚠️ HDS 组件属 API 26 新特性；模拟器不支持沉浸视效，须真机验收。
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  @Local isNarrow: boolean = false;
  @Local isTv: boolean = false;
  private wideListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width >= 840vp)');
  private narrowListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width < 600vp)');
  private tabController: HdsTabsController = new HdsTabsController();
  private scroller: Scroller = new Scroller();
  private pageStack: NavPathStack = new NavPathStack();

  aboutToAppear(): void {
    this.isTv = deviceInfo.deviceType === 'tv';
    this.wideListener.on('change', (mq: mediaquery.MediaQueryResult) => {
      this.isWide = mq.matches;
    });
    this.narrowListener.on('change', (mq: mediaquery.MediaQueryResult) => {
      this.isNarrow = mq.matches;
    });
    this.isWide = this.wideListener.matches;
    this.isNarrow = this.narrowListener.matches;
  }

  aboutToDisappear(): void {
    this.wideListener.off('change');
    this.narrowListener.off('change');
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

  @Builder
  phoneTabs() {
    HdsTabs({ controller: this.tabController }) {
      TabContent() {
        HomePage({ scroller: this.scroller })
      }.tabBar($r('app.string.tab_home'))

      TabContent() {
        LocationsPage()
      }.tabBar($r('app.string.tab_locations'))

      TabContent() {
        AlertsPage()
      }.tabBar($r('app.string.tab_alerts'))

      TabContent() {
        SettingsPage({ pageStack: this.pageStack })
      }.tabBar($r('app.string.tab_settings'))
    }
    .scrollable(false)
    .barOverlap(true)
    .vertical(false)
    .barPosition(BarPosition.End)
    .barFloatingStyle({
      barBottomMargin: 16,
      adaptToHandedness: true,
      systemMaterialEffect: {
        materialType: hdsMaterial.MaterialType.ADAPTIVE,
        materialLevel: this.hdsLevel()
      }
    })
    .onChange((index: number) => {
      uiState.tabIndex = index;
    })
    .width('100%')
    .height('100%')
  }

  @Builder
  masterDetail() {
    Row() {
      LocationsPage({ compact: true }).width('32%').padding(8)
      HomePage({ scroller: this.scroller }).layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  privacyPage() {
    HdsNavDestination() {
      PrivacyView()
    }
    .titleBar({
      content: {
        title: { mainTitle: $r('app.string.privacy_title') }
      }
    })
  }

  build() {
    if (this.isTv) {
      TvHome()
    } else {
      HdsNavigation(this.pageStack) {
        if (this.isWide) {
          this.masterDetail()
        } else {
          this.phoneTabs()
        }
      }
      .hideTitleBar(true)
      .mode(NavigationMode.Stack)
      .navDestination(this.privacyPage)
      .width('100%')
      .height('100%')
    }
  }
}
