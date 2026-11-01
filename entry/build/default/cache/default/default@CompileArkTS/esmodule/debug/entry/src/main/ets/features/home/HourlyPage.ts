if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { DateTimeUtil, TemperatureUnit, UnitUtil, Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherData, HourlyPoint } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export class HourlyPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.initParam("dark", (params && "dark" in params) ? params.dark : false);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("weather", (params && "weather" in params) ? params.weather : undefined);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.resetParam("dark", (params && "dark" in params) ? params.dark : false);
    }
    @Param
    readonly weather: WeatherData | undefined;
    @Param
    readonly unit: TemperatureUnit;
    @Param
    readonly dark: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331662, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_CAPTION + 1);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.sectionTitle(this.dark));
            Text.letterSpacing(0.4);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.padding({ left: 2, right: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<HourlyPoint>(this.weather?.hourly ?? [], this).each((ri: RepeatItem<HourlyPoint>) => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 6 });
                    Column.padding({ top: 12, bottom: 12, left: 14, right: 14 });
                    Column.backgroundColor(Tokens.cardBg(this.dark));
                    Column.borderRadius(Tokens.RADIUS_MD);
                    Column.accessibilityGroup(true);
                    Column.accessibilityText(`${DateTimeUtil.formatHour(ri.item.time)} ${UnitUtil.convertTemp(ri.item.temperature, this.unit)}度 降水概率${ri.item.precipProb}%`);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(DateTimeUtil.formatHour(ri.item.time));
                    Text.fontSize(Tokens.FONT_CAPTION);
                    Text.fontColor(Tokens.subInk(this.dark));
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${UnitUtil.convertTemp(ri.item.temperature, this.unit)}°`);
                    Text.fontSize(Tokens.FONT_HEADLINE);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(Tokens.ink(this.dark));
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${ri.item.precipProb}%`);
                    Text.fontSize(Tokens.FONT_CAPTION);
                    Text.fontColor(Tokens.accent(this.dark));
                }, Text);
                Text.pop();
                Column.pop();
            })
                .key((h: HourlyPoint) => h.time.toString()).render(isInitialRender);
        }, Repeat);
        Row.pop();
        Scroll.pop();
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
        if ("dark" in params) {
            this.updateParam("dark", params.dark);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
