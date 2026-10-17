import { mediaquery } from '@kit.ArkUI';
import { deviceInfo } from '@kit.BasicServicesKit';
import {
  HdsNavigation, HdsNavDestination, HdsTabs, HdsTabsController,
  hdsMaterial
} from '@kit.UIDesignKit';
import { MaterialTier, setLanguageAppliedListener } from 'common';
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
 * - 底部页签：天气 / 位置 / 设置（预警已改为**二级页面**，从天气页入口进入）。
 * - 二级页面：NavPathStack + navDestination（预警 / 数据与隐私），自绘标题栏（hideTitleBar）。
 * - 折叠屏：HdsNavigation 显式 `NavigationMode.Stack`，避免展开态分栏挤压右侧。
 *
 * 语言切换即时生效：`langEpoch` 作为 `$r()` 重建信号量（见 `onLanguageApplied`）。
 * ⚠️ HDS 组件属 API 26 新特性；模拟器不支持沉浸视效，须真机验收。
 */
@Entry
@ComponentV2
struct Index {
  @Local isWide: boolean = false;
  @Local isNarrow: boolean = false;
  @Local isTv: boolean = false;
  /**
   * 语言代次：语言切换成功后自增，用于强制重建整棵组件树。
   * `$r()` 在 build() 执行时才解析资源，故让依赖它的根节点重新 build 即可刷新文案。
   */
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
    // 注册语言变更回调：切换语言后立即重建 UI，无需重启应用。
    setLanguageAppliedListener(() => {
      this.onLanguageApplied();
    });
  }

  aboutToDisappear(): void {
    this.wideListener.off('change');
    this.narrowListener.off('change');
    setLanguageAppliedListener(undefined);
  }

  /**
   * 语言切换后的 UI 重建。
   *
   * `setAppPreferredLanguage` 只改资源查找路径，已渲染的 `$r()` 不会自动刷新，
   * 故通过自增 `langEpoch`（被 build() 读取）触发根组件重新 build。
   * 同时把用户送回顶层页签并清空二级页面栈——否则设置页会停留在半重建状态。
   */
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

  /**
   * 底部导航单个页签：图标 + 文字。
   *
   * 图标取自鸿蒙原生图标库（`HarmonyOS_Icons`），已转为 base/media 下的白色 PNG，
   * 深浅背景下均以白色呈现，与 HdsTabs 悬浮胶囊协调。
   * 未选中 / 选中各一套资源（描边 ↔ 实心），按 uiState.tabIndex 切换。
   */
  @Builder
  tabBarItem(index: number, label: ResourceStr, icon: Resource, iconSelected: Resource) {
    Column({ space: 2 }) {
      Image(index === uiState.tabIndex ? iconSelected : icon)
        .width(24)
        .height(24)
        .fillColor(Color.White)
      Text(label)
        .fontSize(10)
        .fontColor('#FFFFFF')
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
        LocationsPage()
      }.tabBar(this.tabBarItem(1, $r('app.string.tab_locations'),
        $r('app.media.ic_nav_location'), $r('app.media.ic_nav_location_filled')))

      TabContent() {
        SettingsPage({ pageStack: this.pageStack })
      }.tabBar(this.tabBarItem(2, $r('app.string.tab_settings'),
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
      LocationsPage({ compact: true }).width('32%').padding(8)
      HomePage({ scroller: this.scroller, pageStack: this.pageStack }).layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 二级页面分发（navDestination 的 builder）。
   * ⚠️ ArkTS 不允许在普通 lambda 回调里直接写 UI 组件语法，故按官方模式用 @Builder 传入；
   * 各二级页自绘标题栏（hideTitleBar），顶部避让由页面自身控制。
   */
  @Builder
  routePage(name: string) {
    if (name === 'Alerts') {
      HdsNavDestination() {
        AlertsPage({ onBack: () => { this.pageStack.pop(); } })
      }
      .hideTitleBar(true)
    } else if (name === 'Privacy') {
      HdsNavDestination() {
        PrivacyView({ onBack: () => { this.pageStack.pop(); } })
      }
      .hideTitleBar(true)
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
      // ⚠️ 关键：.id() 绑定 langEpoch 建立依赖。语言切换后 id 变化，ArkUI 会
      // **销毁并重建整棵子树**，内部所有 $r() 因此按新语言重新解析——
      // 这是 setAppPreferredLanguage 之后让 UI 立即刷新的唯一可靠手段。
      // 不能删（删了会退化为「改了设置但界面不变，必须重启应用」）。
      .id(`lang-${this.langEpoch}`)
    }
  }
}