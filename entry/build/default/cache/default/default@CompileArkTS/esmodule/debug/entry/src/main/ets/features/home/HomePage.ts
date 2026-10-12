if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { WeatherCard, wmoDescription } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { HourlyPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/HourlyPage";
import { DailyPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/DailyPage";
import { DetailsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/DetailsPage";
export class HomePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("scroller", (params && "scroller" in params) ? params.scroller : new Scroller());
        this.refreshing = false;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("scroller", (params && "scroller" in params) ? params.scroller : new Scroller());
        this.refreshing = false;
    }
    @Param
    readonly scroller: Scroller;
    @Local
    refreshing: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Refresh.create({ refreshing: { value: this.refreshing, changeEvent: newValue => { this.refreshing = newValue; } } });
            Refresh.onRefreshing(() => {
                appStore.refresh();
            });
            Refresh.width('100%');
            Refresh.height('100%');
        }, Refresh);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.scrollBar(BarState.Auto);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(200);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331670, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#6B6B6B');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (appStore.weather) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new WeatherCard(this, {
                                    temperature: appStore.weather.current.temperature,
                                    unit: appStore.settings.temperatureUnit,
                                    condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
                                    locationName: appStore.currentLocation()?.name ?? '',
                                    updatedAt: String(appStore.weather.fetchedAt),
                                    weatherCode: appStore.weather.current.weatherCode,
                                    isDay: appStore.weather.current.isDay,
                                    materialTier: appStore.settings.materialLevel
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 26, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        temperature: appStore.weather.current.temperature,
                                        unit: appStore.settings.temperatureUnit,
                                        condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
                                        locationName: appStore.currentLocation()?.name ?? '',
                                        updatedAt: String(appStore.weather.fetchedAt),
                                        weatherCode: appStore.weather.current.weatherCode,
                                        isDay: appStore.weather.current.isDay,
                                        materialTier: appStore.settings.materialLevel
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    temperature: appStore.weather.current.temperature,
                                    unit: appStore.settings.temperatureUnit,
                                    condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
                                    locationName: appStore.currentLocation()?.name ?? '',
                                    updatedAt: String(appStore.weather.fetchedAt),
                                    weatherCode: appStore.weather.current.weatherCode,
                                    isDay: appStore.weather.current.isDay,
                                    materialTier: appStore.settings.materialLevel
                                });
                            }
                        }, { name: "WeatherCard" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HourlyPage(this, {
                                    weather: appStore.weather,
                                    unit: appStore.settings.temperatureUnit
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 36, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        weather: appStore.weather,
                                        unit: appStore.settings.temperatureUnit
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    weather: appStore.weather,
                                    unit: appStore.settings.temperatureUnit
                                });
                            }
                        }, { name: "HourlyPage" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DailyPage(this, {
                                    weather: appStore.weather,
                                    unit: appStore.settings.temperatureUnit,
                                    lang: appStore.resolveLang()
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 40, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        weather: appStore.weather,
                                        unit: appStore.settings.temperatureUnit,
                                        lang: appStore.resolveLang()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    weather: appStore.weather,
                                    unit: appStore.settings.temperatureUnit,
                                    lang: appStore.resolveLang()
                                });
                            }
                        }, { name: "DailyPage" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailsPage(this, {
                                    current: appStore.weather.current,
                                    unit: appStore.settings.temperatureUnit
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 45, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        current: appStore.weather.current,
                                        unit: appStore.settings.temperatureUnit
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    current: appStore.weather.current,
                                    unit: appStore.settings.temperatureUnit
                                });
                            }
                        }, { name: "DetailsPage" });
                    }
                });
            }
            else if (appStore.error.length > 0) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(200);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331671, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#6B6B6B');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(appStore.error);
                        Text.fontSize(12);
                        Text.fontColor('#9B9B9B');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(200);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331673, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#6B6B6B');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Refresh.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("scroller" in params) {
            this.updateParam("scroller", params.scroller);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
