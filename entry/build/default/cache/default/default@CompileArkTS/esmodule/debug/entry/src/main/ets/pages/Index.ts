if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import mediaquery from "@ohos:mediaquery";
import deviceInfo from "@ohos:deviceInfo";
import { HdsNavigation } from "@hms:hds.hdsBaseComponent";
import { HdsNavDestination } from "@hms:hds.hdsBaseComponent";
import { HdsTabs } from "@hms:hds.hdsBaseComponent";
import { HdsTabsController } from "@hms:hds.hdsBaseComponent";
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import type { HdsNavigationAttribute } from "@hms:hds.hdsBaseComponent";
import type { HdsNavDestinationAttribute } from "@hms:hds.hdsBaseComponent";
import type { HdsTabsAttribute } from "@hms:hds.hdsBaseComponent";
import { MaterialTier, setLanguageAppliedListener } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { uiState } from "@bundle:com.Lumio.Cirrus/entry/ets/store/UiState";
import { HomePage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/HomePage";
import { LocationsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/locations/LocationsPage";
import { AlertsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/alerts/AlertsPage";
import { SettingsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/settings/SettingsPage";
import { PrivacyView } from "@bundle:com.Lumio.Cirrus/entry/ets/features/settings/PrivacyView";
import { TvHome } from "@bundle:com.Lumio.Cirrus/entry/ets/features/tv/TvHome";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.isWide = false;
        this.isNarrow = false;
        this.isTv = false;
        this.langEpoch = 0;
        this.wideListener = mediaquery.matchMediaSync('(width >= 840vp)');
        this.narrowListener = mediaquery.matchMediaSync('(width < 600vp)');
        this.tabController = new HdsTabsController();
        this.scroller = new Scroller();
        this.pageStack = new NavPathStack();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.isWide = false;
        this.isNarrow = false;
        this.isTv = false;
        this.langEpoch = 0;
    }
    @Local
    isWide: boolean;
    @Local
    isNarrow: boolean;
    @Local
    isTv: boolean;
    /**
     * 语言代次：语言切换成功后自增，用于强制重建整棵组件树。
     * `$r()` 在 build() 执行时才解析资源，故让依赖它的根节点重新 build 即可刷新文案。
     */
    @Local
    langEpoch: number;
    private wideListener: mediaquery.MediaQueryListener;
    private narrowListener: mediaquery.MediaQueryListener;
    private tabController: HdsTabsController;
    private scroller: Scroller;
    private pageStack: NavPathStack;
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
    tabBarItem(index: number, label: ResourceStr, icon: Resource, iconSelected: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.width('100%');
            Column.height('52vp');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(index === uiState.tabIndex ? iconSelected : icon);
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(10);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(index === uiState.tabIndex ? FontWeight.Medium : FontWeight.Normal);
        }, Text);
        Text.pop();
        Column.pop();
    }
    phoneTabs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            HdsTabs.create({ controller: this.tabController });
            HdsTabs.scrollable(false);
            HdsTabs.barOverlap(true);
            HdsTabs.vertical(false);
            HdsTabs.barPosition(BarPosition.End);
            HdsTabs.barFloatingStyle({
                barBottomMargin: 16,
                adaptToHandedness: true,
                systemMaterialEffect: {
                    materialType: hdsMaterial.MaterialType.ADAPTIVE,
                    materialLevel: this.hdsLevel()
                }
            });
            HdsTabs.onChange((index: number) => {
                uiState.tabIndex = index;
            });
            HdsTabs.width('100%');
            HdsTabs.height('100%');
        }, HdsTabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomePage(this, { scroller: this.scroller, pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 119, col: 9 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    scroller: this.scroller,
                                    pageStack: this.pageStack
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                scroller: this.scroller, pageStack: this.pageStack
                            });
                        }
                    }, { name: "HomePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBarItem.call(this, 0, { "id": 50331692, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331799, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331798, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LocationsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 124, col: 9 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "LocationsPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBarItem.call(this, 1, { "id": 50331693, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331794, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331795, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SettingsPage(this, { pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 129, col: 9 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    pageStack: this.pageStack
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                pageStack: this.pageStack
                            });
                        }
                    }, { name: "SettingsPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBarItem.call(this, 2, { "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331796, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331797, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        HdsTabs.pop();
    }
    masterDetail(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('32%');
            __Common__.padding(8);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LocationsPage(this, { compact: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 155, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            compact: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        compact: true
                    });
                }
            }, { name: "LocationsPage" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomePage(this, { scroller: this.scroller, pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 156, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            scroller: this.scroller,
                            pageStack: this.pageStack
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        scroller: this.scroller, pageStack: this.pageStack
                    });
                }
            }, { name: "HomePage" });
        }
        __Common__.pop();
        Row.pop();
    }
    /**
     * 二级页面分发（navDestination 的 builder）。
     * ⚠️ ArkTS 不允许在普通 lambda 回调里直接写 UI 组件语法，故按官方模式用 @Builder 传入；
     * 各二级页自绘标题栏（hideTitleBar），顶部避让由页面自身控制。
     */
    routePage(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'Alerts') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create();
                        HdsNavDestination.hideTitleBar(true);
                    }, HdsNavDestination);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AlertsPage(this, { onBack: () => { this.pageStack.pop(); } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 171, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onBack: () => { this.pageStack.pop(); }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    onBack: () => { this.pageStack.pop(); }
                                });
                            }
                        }, { name: "AlertsPage" });
                    }
                    HdsNavDestination.pop();
                });
            }
            else if (name === 'Privacy') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create();
                        HdsNavDestination.hideTitleBar(true);
                    }, HdsNavDestination);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PrivacyView(this, { onBack: () => { this.pageStack.pop(); } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 176, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onBack: () => { this.pageStack.pop(); }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    onBack: () => { this.pageStack.pop(); }
                                });
                            }
                        }, { name: "PrivacyView" });
                    }
                    HdsNavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isTv) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TvHome(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 184, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "TvHome" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    if (!If.canRetake(`lang-${this.langEpoch}`)) {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            HdsNavigation.create(this.pageStack);
                            HdsNavigation.hideTitleBar(true);
                            HdsNavigation.mode(NavigationMode.Stack);
                            HdsNavigation.navDestination({ builder: this.routePage.bind(this) });
                            HdsNavigation.width('100%');
                            HdsNavigation.height('100%');
                            HdsNavigation.id(`lang-${this.langEpoch}`);
                        }, HdsNavigation);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (this.isWide) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.masterDetail.bind(this)();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.phoneTabs.bind(this)();
                                });
                            }
                        }, If);
                        If.pop();
                        HdsNavigation.pop();
                    }
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.Lumio.Cirrus", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
