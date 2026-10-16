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
import { MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
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
    }
    @Local
    isWide: boolean;
    @Local
    isNarrow: boolean;
    @Local
    isTv: boolean;
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
                            let componentCall = new HomePage(this, { scroller: this.scroller }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 75, col: 9 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    scroller: this.scroller
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                scroller: this.scroller
                            });
                        }
                    }, { name: "HomePage" });
                }
            });
            TabContent.tabBar({ "id": 50331692, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LocationsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 79, col: 9 });
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
            TabContent.tabBar({ "id": 50331693, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AlertsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 83, col: 9 });
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
            });
            TabContent.tabBar({ "id": 50331691, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SettingsPage(this, { pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 87, col: 9 });
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
            TabContent.tabBar({ "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
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
                    let componentCall = new LocationsPage(this, { compact: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 112, col: 7 });
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
                    let componentCall = new HomePage(this, { scroller: this.scroller }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 113, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            scroller: this.scroller
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        scroller: this.scroller
                    });
                }
            }, { name: "HomePage" });
        }
        __Common__.pop();
        Row.pop();
    }
    privacyPage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            HdsNavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new PrivacyView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 122, col: 7 });
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
                content: {
                    title: { mainTitle: { "id": 50331776, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } }
                }
            });
        }, HdsNavDestination);
        HdsNavDestination.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isTv) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TvHome(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 133, col: 7 });
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
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsNavigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
                        HdsNavigation.hideTitleBar(true);
                        HdsNavigation.mode(NavigationMode.Stack);
                        HdsNavigation.navDestination({ builder: this.privacyPage.bind(this) });
                        HdsNavigation.width('100%');
                        HdsNavigation.height('100%');
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
