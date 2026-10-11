if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { TemperatureUnit } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { CurrentWeather } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export class DetailsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("current", (params && "current" in params) ? params.current : undefined);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("current", (params && "current" in params) ? params.current : undefined);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
    }
    @Param
    readonly current: CurrentWeather | undefined;
    @Param
    readonly unit: TemperatureUnit;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331661, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.current) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                    }, Row);
                    this.detailCard.bind(this)({ "id": 50331663, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.humidity}%`);
                    this.detailCard.bind(this)({ "id": 50331667, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.windSpeed} km/h`);
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                    }, Row);
                    this.detailCard.bind(this)({ "id": 50331664, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.pressure} hPa`);
                    this.detailCard.bind(this)({ "id": 50331665, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.uvIndex}`);
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                    }, Row);
                    this.detailCard.bind(this)({ "id": 50331666, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.visibility} km`);
                    this.detailCard.bind(this)({ "id": 50331658, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, `${this.current.cloud}%`);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    detailCard(label: Resource, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.padding(10);
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(255,255,255,0.6)');
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#6B6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("current" in params) {
            this.updateParam("current", params.current);
        }
        if ("unit" in params) {
            this.updateParam("unit", params.unit);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
