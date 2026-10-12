if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import mediaquery from "@ohos:mediaquery";
import { HdsNavigation } from "@hms:hds.hdsBaseComponent";
import { HdsNavigationTitleMode } from "@hms:hds.hdsBaseComponent";
import { HdsTabs } from "@hms:hds.hdsBaseComponent";
import { HdsTabsController } from "@hms:hds.hdsBaseComponent";
import { HideMode } from "@hms:hds.hdsBaseComponent";
import { ScrollEffectType } from "@hms:hds.hdsBaseComponent";
import { hdsMaterial } from "@hms:hds.hdsMaterial";
import type { HdsNavigationAttribute } from "@hms:hds.hdsBaseComponent";
import type { HdsTabsAttribute } from "@hms:hds.hdsBaseComponent";
import { MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { HomePage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/HomePage";
import { LocationsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/locations/LocationsPage";
import { SettingsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/settings/SettingsPage";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.isWide = false;
        this.listener = mediaquery.matchMediaSync('(width >= 840vp)');
        this.tabController = new HdsTabsController();
        this.scroller = new Scroller();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.isWide = false;
    }
    @Local
    isWide: boolean;
    private listener: mediaquery.MediaQueryListener;
    private tabController: HdsTabsController;
    private scroller: Scroller;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            HdsNavigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: false });
            HdsNavigation.titleMode(HdsNavigationTitleMode.MINI);
            HdsNavigation.hideBackButton(true);
            HdsNavigation.titleBar({
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
            });
            HdsNavigation.dynamicHideTitleBar({
                hideTitleArea: true,
                hideStatusBar: true,
                mode: HideMode.SCROLL_UP_TO
            });
            HdsNavigation.bindToScrollable([this.scroller]);
            HdsNavigation.width('100%');
            HdsNavigation.height('100%');
        }, HdsNavigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWide) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.height('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width('30%');
                        __Common__.padding(8);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LocationsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 55, col: 11 });
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
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HomePage(this, { scroller: this.scroller }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 56, col: 11 });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        HdsTabs.create({ controller: this.tabController });
                        HdsTabs.scrollable(false);
                        HdsTabs.barOverlap(true);
                        HdsTabs.vertical(false);
                        HdsTabs.barPosition(BarPosition.End);
                        HdsTabs.barFloatingStyle({
                            adaptToHandedness: true,
                            systemMaterialEffect: {
                                materialType: hdsMaterial.MaterialType.ADAPTIVE,
                                materialLevel: this.hdsLevel()
                            }
                        });
                        HdsTabs.width('100%');
                        HdsTabs.height('100%');
                    }, HdsTabs);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TabContent.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new HomePage(this, { scroller: this.scroller }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 63, col: 13 });
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
                        TabContent.tabBar({ "id": 50331687, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                    }, TabContent);
                    TabContent.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TabContent.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LocationsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 67, col: 13 });
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
                        TabContent.tabBar({ "id": 50331688, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                    }, TabContent);
                    TabContent.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TabContent.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SettingsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 71, col: 13 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "SettingsPage" });
                            }
                        });
                        TabContent.tabBar({ "id": 50331689, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                    }, TabContent);
                    TabContent.pop();
                    HdsTabs.pop();
                });
            }
        }, If);
        If.pop();
        HdsNavigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.Lumio.Cirrus", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
