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
import { MaterialTier, Tokens, setLanguageAppliedListener } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { uiState } from "@bundle:com.Lumio.Cirrus/entry/ets/store/UiState";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
import { SystemBar } from "@bundle:com.Lumio.Cirrus/entry/ets/system/SystemBar";
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
            Image.fillColor(this.tabInk(index === uiState.tabIndex));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(10);
            Text.fontColor(this.tabInk(index === uiState.tabIndex));
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
                            let componentCall = new HomePage(this, { scroller: this.scroller, pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 107, col: 9 });
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
                            let componentCall = new SettingsPage(this, { pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 112, col: 9 });
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
                    this.tabBarItem.call(this, 1, { "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331796, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331797, "type": 20000, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
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
            __Common__.width('34%');
            __Common__.padding(8);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LocationsPage(this, { compact: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 138, col: 7 });
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
                    let componentCall = new HomePage(this, { scroller: this.scroller, pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 139, col: 7 });
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
     * 二级页分发。标题栏/返回按钮由 HdsNavDestination 原生提供；
     * - `avoidLayoutSafeArea: true` 让标题栏自动避让状态栏（不再用 margin hack）；
     * - `originalStyle` 显式给出标题栏背景/标题/返回图标的主题色 → 深色模式不再白底白字。
     */
    routePage(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'Locations') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LocationsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 154, col: 9 });
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
                        }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index" });
                        HdsNavDestination.titleBar({
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
                            content: { title: { mainTitle: { "id": 50331693, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } } }
                        });
                        HdsNavDestination.backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()));
                        HdsNavDestination.onShown(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                        HdsNavDestination.onHidden(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                    }, HdsNavDestination);
                    HdsNavDestination.pop();
                });
            }
            else if (name === 'Alerts') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new AlertsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 178, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "AlertsPage" });
                            }
                        }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index" });
                        HdsNavDestination.titleBar({
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
                            content: { title: { mainTitle: { "id": 50331691, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } } }
                        });
                        HdsNavDestination.backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()));
                        HdsNavDestination.onShown(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                        HdsNavDestination.onHidden(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                    }, HdsNavDestination);
                    HdsNavDestination.pop();
                });
            }
            else if (name === 'Privacy') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new PrivacyView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 202, col: 9 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "PrivacyView" });
                            }
                        }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index" });
                        HdsNavDestination.titleBar({
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
                            content: { title: { mainTitle: { "id": 50331684, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } } }
                        });
                        HdsNavDestination.backgroundColor(Tokens.surfaceBg(themeModel.resolveDark()));
                        HdsNavDestination.onShown(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                        HdsNavDestination.onHidden(() => {
                            SystemBar.setTone(themeModel.resolveDark());
                        });
                    }, HdsNavDestination);
                    HdsNavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
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
                                let componentCall = new TvHome(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 229, col: 7 });
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
                            HdsNavigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
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
