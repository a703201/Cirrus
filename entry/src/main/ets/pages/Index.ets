import { mediaquery } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import {
  HdsNavigation, HdsNavDestination, HdsTabs, HdsTabsController,
  hdsMaterial
} from '@kit.UIDesignKit';
import { MaterialTier, Tokens, setLanguageAppliedListener } from 'common';
import { appStore } from '../store/AppStore';
import { uiState } from '../store/UiState';
import { themeModel } from '../store/ThemeModel';
import { SystemBar } from '../system/SystemBar';
import { HomePage } from '../features/home/HomePage';
import { LocationsPage } from '../features/locations/LocationsPage';
import { AlertsPage } from '../features/alerts/AlertsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { PrivacyView } from '../features/settings/PrivacyView';
import { TvHome } from '../features/tv/TvHome';

/**
 * App entry (V2) — 卷云·气象拟真 × apple-design（docs/13）。
 * - 底部页签：**天气 / 设置**。位置管理改为设置页入口 → 二级页（需求 5）。
 * - 二级页：HdsNavDestination 原生标题栏；`geometryTransition` 实现「一镜到底」共享元素转场（需求 6）。
 * - 状态栏：二级页 onShown/onHidden 实时切换图标色（需求 1）。
 * - 折叠屏：NavigationMode.Stack，避免展开态分栏挤压右侧。
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  @Local isNarrow: boolean = false;
  @Local isTv: boolean = false;
  @Local langEpoch: number = 0;
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
    setLanguageAppliedListener(() => {
      this.onLanguageApplied();
    });
  }

  aboutToDisappear(): void {
    this.wideListener.off('change');
    this.narrowListener.off('change');
    setLanguageAppliedListener(undefined);
  }

  private onLanguageApplied(): void {
    this.pageStack.clear();
    this.tabController.changeIndex(uiState.tabIndex);
    this.langEpoch++;
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

  private tabInk(selected: boolean): string {
    if (themeModel.resolveDark()) {
      return selected ? '#FFFFFF' : '#B3FFFFFF';
    }
    return selected ? '#111417' : '#8A000000';
  }

  @Builder
  tabBarItem(index: number, label: ResourceStr, icon: Resource, iconSelected: Resource) {
    Column({ space: 2 }) {
      Image(index === uiState.tabIndex ? iconSelected : icon)
        .width(24)
        .height(24)
        .fillColor(this.tabInk(index === uiState.tabIndex))
      Text(label)
        .fontSize(10)
        .fontColor(this.tabInk(index === uiState.tabIndex))
        .fontWeight(index === uiState.tabIndex ? FontWeight.Medium : FontWeight.Normal)
    }
    .width('100%')
    .height('52vp')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  phoneTabs() {
    HdsTabs({ controller: this.tabController }) {
      TabContent() {
        HomePage({ scroller: this.scroller, pageStack: this.pageStack })
      }.tabBar(this.tabBarItem(0, $r('app.string.tab_home'),
        $r('app.media.ic_nav_weather_outline'), $r('app.media.ic_nav_weather')))

      TabContent() {
        SettingsPage({ pageStack: this.pageStack })
      }.tabBar(this.tabBarItem(1, $r('app.string.tab_settings'),
        $r('app.media.ic_nav_settings'), $r('app.media.ic_nav_settings_filled')))
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
      LocationsPage({ compact: true }).width('34%').padding(8)
      HomePage({ scroller: this.scroller, pageStack: this.pageStack }).layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 二级页分发。标题栏/返回按钮由 HdsNavDestination 原生提供；
   * - `avoidLayoutSafeArea: true` 让标题栏自动避让状态栏（不再用 margin hack）；
   * - `originalStyle` 显式给出标题栏背景/标题/返回图标的主题色 → 深色模式不再白底白字。
   */
  @Builder
  routePage(name: string) {
    if (name === 'Locations') {
      HdsNavDestination() {
        LocationsPage()
      }
      .titleBar({
        avoidLayoutSafeArea: true,
        style: {
          originalStyle: {
            backgroundStyle: { backgroundColor: Tokens.surfaceBg(themeModel.resolveDark()) },
            contentStyle: {
              titleStyle: { mainTitleColor: Tokens.ink(themeModel.resolveDark()) },
              backIconStyle: { iconColor: Tokens.ink(themeModel.resolveDark()) }
            }
          }
        },
        content: { title: { mainTitle: $r('app.string.tab_locations') } }
      })
      .backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()))
      .onShown(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
      .onHidden(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
    } else if (name === 'Alerts') {
      HdsNavDestination() {
        AlertsPage()
      }
      .titleBar({
        avoidLayoutSafeArea: true,
        style: {
          originalStyle: {
            backgroundStyle: { backgroundColor: Tokens.surfaceBg(themeModel.resolveDark()) },
            contentStyle: {
              titleStyle: { mainTitleColor: Tokens.ink(themeModel.resolveDark()) },
              backIconStyle: { iconColor: Tokens.ink(themeModel.resolveDark()) }
            }
          }
        },
        content: { title: { mainTitle: $r('app.string.tab_alerts') } }
      })
      .backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()))
      .onShown(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
      .onHidden(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
    } else if (name === 'Privacy') {
      HdsNavDestination() {
        PrivacyView()
      }
      .titleBar({
        avoidLayoutSafeArea: true,
        style: {
          originalStyle: {
            backgroundStyle: { backgroundColor: Tokens.surfaceBg(themeModel.resolveDark()) },
            contentStyle: {
              titleStyle: { mainTitleColor: Tokens.ink(themeModel.resolveDark()) },
              backIconStyle: { iconColor: Tokens.ink(themeModel.resolveDark()) }
            }
          }
        },
        content: { title: { mainTitle: $r('app.string.settings_privacy') } }
      })
      .backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()))
      .onShown(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
      .onHidden(() => {
        SystemBar.setTone(themeModel.resolveDark());
      })
    }
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
      .navDestination(this.routePage)
      .width('100%')
      .height('100%')
      .id(`lang-${this.langEpoch}`)
    }
  }
}