if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { wmoDescription, TemperatureUnit, UnitUtil } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherData, DailyPoint } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export class DailyPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.initParam("lang", (params && "lang" in params) ? params.lang : 'en');
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.resetParam("lang", (params && "lang" in params) ? params.lang : 'en');
    }
    @Param
    readonly weather: WeatherData | undefined;
    @Param
    readonly unit: TemperatureUnit;
    @Param
    readonly lang: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331659, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<DailyPoint>(this.weather?.daily ?? [], this).each((ri: RepeatItem<DailyPoint>) => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.padding(12);
                    Row.backgroundColor('rgba(255,255,255,0.5)');
                    Row.borderRadius(12);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(ri.item.date);
                    Text.fontSize(14);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(wmoDescription(ri.item.weatherCodeDay, this.lang));
                    Text.fontSize(14);
                    Text.fontColor('#6B6B6B');
                    Text.layoutWeight(2);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${UnitUtil.convertTemp(ri.item.tempMin, this.unit)}° / ${UnitUtil.convertTemp(ri.item.tempMax, this.unit)}°`);
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                }, Text);
                Text.pop();
                Row.pop();
            })
                .key((d: DailyPoint) => d.date).render(isInitialRender);
        }, Repeat);
        Column.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("weather" in params) {
            this.updateParam("weather", params.weather);
        }
        if ("unit" in params) {
            this.updateParam("unit", params.unit);
        }
        if ("lang" in params) {
            this.updateParam("lang", params.lang);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
