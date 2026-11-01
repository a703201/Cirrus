if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { wmoDescription, TemperatureUnit, UnitUtil, Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherData, DailyPoint } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export class DailyPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.initParam("lang", (params && "lang" in params) ? params.lang : 'en');
        this.initParam("dark", (params && "dark" in params) ? params.dark : false);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.resetParam("lang", (params && "lang" in params) ? params.lang : 'en');
        this.resetParam("dark", (params && "dark" in params) ? params.dark : false);
    }
    @Param
    readonly weather: WeatherData | undefined;
    @Param
    readonly unit: TemperatureUnit;
    @Param
    readonly lang: string;
    @Param
    readonly dark: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331659, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_CAPTION + 1);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.sectionTitle(this.dark));
            Text.letterSpacing(0.4);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.width('100%');
            Column.padding({ left: 14, right: 14, top: 4, bottom: 4 });
            Column.backgroundColor(Tokens.cardBg(this.dark));
            Column.borderRadius(Tokens.RADIUS_LG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<DailyPoint>(this.weather?.daily ?? [], this).each((ri: RepeatItem<DailyPoint>) => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ top: 10, bottom: 10 });
                    Row.accessibilityGroup(true);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(ri.item.date);
                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                    Text.fontColor(Tokens.subInk(this.dark));
                    Text.layoutWeight(3);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(wmoDescription(ri.item.weatherCodeDay, this.lang));
                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                    Text.fontColor(Tokens.subInk(this.dark));
                    Text.layoutWeight(4);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${UnitUtil.convertTemp(ri.item.tempMin, this.unit)}°`);
                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                    Text.fontColor(Tokens.sectionTitle(this.dark));
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(' / ');
                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                    Text.fontColor(Tokens.sectionTitle(this.dark));
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${UnitUtil.convertTemp(ri.item.tempMax, this.unit)}°`);
                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(Tokens.ink(this.dark));
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
        if ("dark" in params) {
            this.updateParam("dark", params.dark);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
