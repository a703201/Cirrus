if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { WeatherCard, wmoDescription, DateTimeUtil } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { SkyPalette } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
import { HourlyPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/HourlyPage";
import { DailyPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/DailyPage";
import { DetailsPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/DetailsPage";
import { MinutelyPage } from "@bundle:com.Lumio.Cirrus/entry/ets/features/home/MinutelyPage";
export class HomePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("scroller", (params && "scroller" in params) ? params.scroller : new Scroller());
        this.initParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
        this.refreshing = false;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("scroller", (params && "scroller" in params) ? params.scroller : new Scroller());
        this.resetParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
        this.refreshing = false;
    }
    @Param
    readonly scroller: Scroller;
    @Param
    readonly pageStack: NavPathStack;
    @Local
    refreshing: boolean;
    private palette(): SkyPalette {
        const code: number = appStore.weather?.current.weatherCode ?? 0;
        const isDay: boolean = appStore.weather?.current.isDay ?? true;
        return themeModel.palette(code, isDay);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Refresh.create({ refreshing: { value: this.refreshing, changeEvent: newValue => { this.refreshing = newValue; } } });
            Refresh.onRefreshing(() => {
                appStore.refresh().then(() => {
                    this.refreshing = false;
                });
            });
            Refresh.width('100%');
            Refresh.height('100%');
            Refresh.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
            Refresh.linearGradient({
                angle: 180,
                colors: [[this.palette().bgTop, 0.0], [this.palette().bgBottom, 1.0]]
            });
        }, Refresh);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.padding({ top: 44, left: 16, right: 16, bottom: 96 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.error.length > 0 && appStore.weather) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331675, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(12);
                        Text.fontColor('#EF4444');
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(220);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331674, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#595959');
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
                                    locationName: (appStore.currentLocation()?.name ?? '').length > 0
                                        ? (appStore.currentLocation()?.name ?? '')
                                        : { "id": 50331655, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" },
                                    updatedAt: DateTimeUtil.formatHour(appStore.weather.fetchedAt),
                                    weatherCode: appStore.weather.current.weatherCode,
                                    isDay: appStore.weather.current.isDay,
                                    materialTier: appStore.settings.materialLevel,
                                    high: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMax : -999,
                                    low: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMin : -999,
                                    apparent: appStore.weather.current.apparent
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 42, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        temperature: appStore.weather.current.temperature,
                                        unit: appStore.settings.temperatureUnit,
                                        condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
                                        locationName: (appStore.currentLocation()?.name ?? '').length > 0
                                            ? (appStore.currentLocation()?.name ?? '')
                                            : { "id": 50331655, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" },
                                        updatedAt: DateTimeUtil.formatHour(appStore.weather.fetchedAt),
                                        weatherCode: appStore.weather.current.weatherCode,
                                        isDay: appStore.weather.current.isDay,
                                        materialTier: appStore.settings.materialLevel,
                                        high: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMax : -999,
                                        low: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMin : -999,
                                        apparent: appStore.weather.current.apparent
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    temperature: appStore.weather.current.temperature,
                                    unit: appStore.settings.temperatureUnit,
                                    condition: wmoDescription(appStore.weather.current.weatherCode, appStore.resolveLang()),
                                    locationName: (appStore.currentLocation()?.name ?? '').length > 0
                                        ? (appStore.currentLocation()?.name ?? '')
                                        : { "id": 50331655, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" },
                                    updatedAt: DateTimeUtil.formatHour(appStore.weather.fetchedAt),
                                    weatherCode: appStore.weather.current.weatherCode,
                                    isDay: appStore.weather.current.isDay,
                                    materialTier: appStore.settings.materialLevel,
                                    high: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMax : -999,
                                    low: appStore.weather.daily.length > 0 ? appStore.weather.daily[0].tempMin : -999,
                                    apparent: appStore.weather.current.apparent
                                });
                            }
                        }, { name: "WeatherCard" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.create({ space: 8 });
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.width('100%');
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.padding(14);
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.backgroundColor('rgba(255,255,255,0.6)');
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.borderRadius(14);
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.accessibilityGroup(true);
                        // 预警入口（二级页面）——与设置页行样式一致。
                        Row.onClick(() => {
                            this.pageStack.pushPath({ name: 'Alerts' });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331691, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Medium);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${appStore.weather.alerts?.length ?? 0}`);
                        Text.fontSize(14);
                        Text.fontColor((appStore.weather.alerts?.length ?? 0) > 0 ? '#C5221F' : '#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.accessibilityLevel('no');
                    }, Text);
                    Text.pop();
                    // 预警入口（二级页面）——与设置页行样式一致。
                    Row.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MinutelyPage(this, {
                                    minutely: appStore.weather.minutely,
                                    summary: appStore.weather.minutelySummary ?? ''
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 78, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        minutely: appStore.weather.minutely,
                                        summary: appStore.weather.minutelySummary ?? ''
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    minutely: appStore.weather.minutely,
                                    summary: appStore.weather.minutelySummary ?? ''
                                });
                            }
                        }, { name: "MinutelyPage" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailsPage(this, {
                                    current: appStore.weather.current,
                                    airQuality: appStore.weather.airQuality,
                                    unit: appStore.settings.temperatureUnit
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 82, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        current: appStore.weather.current,
                                        airQuality: appStore.weather.airQuality,
                                        unit: appStore.settings.temperatureUnit
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    current: appStore.weather.current,
                                    airQuality: appStore.weather.airQuality,
                                    unit: appStore.settings.temperatureUnit
                                });
                            }
                        }, { name: "DetailsPage" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HourlyPage(this, {
                                    weather: appStore.weather,
                                    unit: appStore.settings.temperatureUnit
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 87, col: 13 });
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
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/HomePage.ets", line: 91, col: 13 });
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
                });
            }
            else if (appStore.error.length > 0) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(220);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331675, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#595959');
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
                        Column.height(220);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331677, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.fontColor('#595959');
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
        if ("pageStack" in params) {
            this.updateParam("pageStack", params.pageStack);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
