if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { TemperatureUnit } from "@bundle:com.Lumio.Cirrus/entry@common/ets/models/Settings";
import { UnitUtil } from "@bundle:com.Lumio.Cirrus/entry@common/ets/utils/UnitUtil";
export class WeatherCard extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("temperature", (params && "temperature" in params) ? params.temperature : 0);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.initParam("condition", (params && "condition" in params) ? params.condition : '');
        this.initParam("locationName", (params && "locationName" in params) ? params.locationName : '');
        this.initParam("updatedAt", (params && "updatedAt" in params) ? params.updatedAt : '');
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("temperature", (params && "temperature" in params) ? params.temperature : 0);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.resetParam("condition", (params && "condition" in params) ? params.condition : '');
        this.resetParam("locationName", (params && "locationName" in params) ? params.locationName : '');
        this.resetParam("updatedAt", (params && "updatedAt" in params) ? params.updatedAt : '');
    }
    @Param
    readonly temperature: number;
    @Param
    readonly unit: TemperatureUnit;
    @Param
    readonly condition: string;
    @Param
    readonly locationName: ResourceStr;
    @Param
    readonly updatedAt: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('rgba(255,255,255,0.35)');
            Column.backgroundBlurStyle(BlurStyle.COMPONENT_THICK);
            Column.borderRadius(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.locationName);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${UnitUtil.convertTemp(this.temperature, this.unit)}°`);
            Text.fontSize(72);
            Text.fontWeight(FontWeight.Lighter);
            Text.fontColor('#1A1A1A');
            Text.margin({ top: 6, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.condition);
            Text.fontSize(16);
            Text.fontColor('#4A4A4A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.updatedAt.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.updatedAt);
                        Text.fontSize(12);
                        Text.fontColor('#6B6B6B');
                        Text.margin({ top: 8 });
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
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("temperature" in params) {
            this.updateParam("temperature", params.temperature);
        }
        if ("unit" in params) {
            this.updateParam("unit", params.unit);
        }
        if ("condition" in params) {
            this.updateParam("condition", params.condition);
        }
        if ("locationName" in params) {
            this.updateParam("locationName", params.locationName);
        }
        if ("updatedAt" in params) {
            this.updateParam("updatedAt", params.updatedAt);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
