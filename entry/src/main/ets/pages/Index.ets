import { mediaquery } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import {
  HdsNavigation, HdsNavigationTitleMode, HdsSideBar, HdsTabs, HdsTabsController,
  HideMode, ScrollEffectType, hdsMaterial
} from '@kit.UIDesignKit';
import { MaterialTier, Log } from 'common';
import { appStore } from '../store/AppStore';
import { uiState } from '../store/UiState';
import { HomePage } from '../features/home/HomePage';
import { LocationsPage } from '../features/locations/LocationsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { TvHome } from '../features/tv/TvHome';

/**
 * App entry page (state management V2) — 卷云·气象拟真（docs/13 §10）.
 * - P1-2/P1-3: HdsNavigation（标题栏渐变模糊 + 动态显隐）+ HdsTabs（悬浮胶囊 + 智感握姿）。
 * - P1-5: 大屏（>=840vp）主从布局 + `HdsSideBar` 侧栏；Pura X 外屏等窄屏（<600vp）单列；页签经 PersistenceV2 记忆。
 * - P1-6: TV 走焦点式 TvHome。
 *
 * ⚠️ HDS 组件与 systemMaterialEffect 属 API 26 新特性；模拟器不支持沉浸视效，须真机验收。
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  @Local isNarrow: boolean = false;
  @Local isTv: boolean = false;
  @Local hdsAvailable: boolean = false;
  private wideListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width >= 840vp)');
  private narrowListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width < 600vp)');
  private tabController: HdsTabsController = new HdsTabsController();
  private scroller: Scroller = new Scroller();

  aboutToAppear(): void {
    this.isTv = deviceInfo.deviceType === 'tv';
    this.detectHds();
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

  /** HDS 能力探测：沉浸光感材质可用才启用 `HdsSideBar`，否则回退普通 Row（docs/11 §2.4）。 */
  private detectHds(): void {
    try {
      this.hdsAvailable = hdsMaterial.getSystemMaterialTypes().length > 0;
    } catch (e) {
      this.hdsAvailable = false;
    }
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
    .onChange((index: number) => {
      uiState.tabIndex = index;
    })
    .width('100%')
    .height('100%')
  }

  @Builder
  masterDetail() {
    if (this.hdsAvailable) {
      HdsSideBar({
        sideBarPanelBuilder: (): void => {
          this.sideBarBuilder();
        },
        contentPanelBuilder: (): void => {
          this.contentBuilder();
        },
        sideBarContainerType: SideBarContainerType.Embed,
        maxSideBarWidth: 280,
        sideBarWidth: 240
      })
      .width('100%')
      .height('100%')
    } else {
      Row() {
        LocationsPage({ compact: true }).width('30%').padding(8)
        HomePage({ scroller: this.scroller }).layoutWeight(1)
      }
      .width('100%')
      .height('100%')
    }
  }

  @Builder
  sideBarBuilder() {
    LocationsPage({ compact: true })
      .width('100%')
      .height('100%')
      .padding(8)
  }

  @Builder
  contentBuilder() {
    HomePage({ scroller: this.scroller })
      .width('100%')
      .height('100%')
  }

  build() {
    if (this.isTv) {
      TvHome()
    } else {
      HdsNavigation() {
        if (this.isWide) {
          this.masterDetail()
        } else {
          this.phoneTabs()
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
}
