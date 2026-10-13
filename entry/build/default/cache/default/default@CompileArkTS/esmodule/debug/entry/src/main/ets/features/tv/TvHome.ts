if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { wmoDescription } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo, SkyPalette } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
export class TvHome extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    private palette(): SkyPalette {
        const code: number = appStore.weather?.current.weatherCode ?? 0;
        const isDay: boolean = appStore.weather?.current.isDay ?? true;
        return themeModel.palette(code, isDay);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.padding(40);
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.linearGradient({
                angle: 180,
                colors: [[this.palette().bgTop, 0.0], [this.palette().bgBottom, 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(appStore.currentLocation()?.name ?? 'Cirrus');
            Text.fontSize(40);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 32 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${appStore.weather?.current.temperature ?? 0}°`);
            Text.fontSize(112);
            Text.fontWeight(FontWeight.Lighter);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(wmoDescription(appStore.weather?.current.weatherCode ?? 0, appStore.resolveLang()));
            Text.fontSize(28);
            Text.fontColor('#4A4A4A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${appStore.weather?.current.humidity ?? 0}%`);
            Text.fontSize(24);
            Text.fontColor('#6B6B6B');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.focusWrapMode(FocusWrapMode.WRAP_WITH_ARROW);
            List.layoutWeight(1);
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<LocationInfo>(appStore.locations, this).each((ri: RepeatItem<LocationInfo>) => {
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.padding(24);
                            Row.backgroundColor('rgba(255,255,255,0.5)');
                            Row.borderRadius(20);
                            Row.focusable(true);
                            Row.onClick(() => {
                                appStore.selectLocation(ri.item.id);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(ri.item.name);
                            Text.fontSize(28);
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (ri.item.id === appStore.currentId) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create({ "id": 50331660, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                        Text.fontSize(20);
                                        Text.fontColor('#3B82F6');
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
                        Row.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            })
                .key((loc: LocationInfo) => loc.id).render(isInitialRender);
        }, Repeat);
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
