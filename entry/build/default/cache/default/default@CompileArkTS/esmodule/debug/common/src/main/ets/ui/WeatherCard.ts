if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { TemperatureUnit, MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/models/Settings";
import { MaterialUtil } from "@bundle:com.Lumio.Cirrus/entry@common/ets/ui/MaterialUtil";
import { GradientText } from "@bundle:com.Lumio.Cirrus/entry@common/ets/ui/GradientText";
import { wmoIconKey } from "@bundle:com.Lumio.Cirrus/entry@common/ets/models/WmoCode";
export class WeatherCard extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("temperature", (params && "temperature" in params) ? params.temperature : 0);
        this.initParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.initParam("condition", (params && "condition" in params) ? params.condition : '');
        this.initParam("locationName", (params && "locationName" in params) ? params.locationName : '');
        this.initParam("updatedAt", (params && "updatedAt" in params) ? params.updatedAt : '');
        this.initParam("weatherCode", (params && "weatherCode" in params) ? params.weatherCode : 0);
        this.initParam("isDay", (params && "isDay" in params) ? params.isDay : true);
        this.initParam("materialTier", (params && "materialTier" in params) ? params.materialTier : MaterialTier.AUTO);
        this.initParam("high", (params && "high" in params) ? params.high : -999);
        this.initParam("low", (params && "low" in params) ? params.low : -999);
        this.initParam("apparent", (params && "apparent" in params) ? params.apparent : -999);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("temperature", (params && "temperature" in params) ? params.temperature : 0);
        this.resetParam("unit", (params && "unit" in params) ? params.unit : TemperatureUnit.CELSIUS);
        this.resetParam("condition", (params && "condition" in params) ? params.condition : '');
        this.resetParam("locationName", (params && "locationName" in params) ? params.locationName : '');
        this.resetParam("updatedAt", (params && "updatedAt" in params) ? params.updatedAt : '');
        this.resetParam("weatherCode", (params && "weatherCode" in params) ? params.weatherCode : 0);
        this.resetParam("isDay", (params && "isDay" in params) ? params.isDay : true);
        this.resetParam("materialTier", (params && "materialTier" in params) ? params.materialTier : MaterialTier.AUTO);
        this.resetParam("high", (params && "high" in params) ? params.high : -999);
        this.resetParam("low", (params && "low" in params) ? params.low : -999);
        this.resetParam("apparent", (params && "apparent" in params) ? params.apparent : -999);
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
    @Param
    readonly weatherCode: number;
    @Param
    readonly isDay: boolean;
    @Param
    readonly materialTier: MaterialTier;
    @Param
    readonly high: number;
    @Param
    readonly low: number;
    @Param
    readonly apparent: number;
    private convert(v: number): number {
        return this.unit === TemperatureUnit.FAHRENHEIT ? Math.round(v * 9 / 5 + 32) : Math.round(v);
    }
    private tempText(): string {
        return `${this.convert(this.temperature)}°`;
    }
    /**
     * 天气图标资源：文件名 = `wx_<base>_<day|night>`，与 `wmoIconKey()` 输出一致，
     * 资源置于 common 模块 media（erikflowers/weather-icons，MIT，见 README）。
     */
    private iconResource(): Resource {
        const key: string = wmoIconKey(this.weatherCode, this.isDay);
        return { get id() {
                return typeof __getResourceId__ === "function" ? __getResourceId__(this) : -1;
            }, "type": -1, params: ['common.media.' + key], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.width('100%');
            Column.padding({ top: 26, bottom: 26, left: 20, right: 20 });
            Column.backgroundColor('rgba(255,255,255,0.38)');
            Column.backgroundBlurStyle(MaterialUtil.cardBlurStyle(this.materialTier));
            Column.borderRadius(28);
            Column.accessibilityGroup(true);
            Column.accessibilityText(`${this.tempText()} ${this.condition}`);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.locationName);
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1A1A1A');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ top: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.iconResource());
            Image.width(52);
            Image.height(52);
            Image.fillColor(this.isDay ? '#3B82F6' : '#7EA6F0');
        }, Image);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new GradientText(this, {
                        text: this.tempText(),
                        fontSize: 88,
                        fontWeight: FontWeight.Lighter,
                        colors: this.isDay ? ['#1A1A1A', '#3B82F6'] : ['#F2F2F2', '#7EA6F0']
                    }, undefined, elmtId, () => { }, { page: "common/src/main/ets/ui/WeatherCard.ets", line: 57, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.tempText(),
                            fontSize: 88,
                            fontWeight: FontWeight.Lighter,
                            colors: this.isDay ? ['#1A1A1A', '#3B82F6'] : ['#F2F2F2', '#7EA6F0']
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: this.tempText(),
                        fontSize: 88,
                        fontWeight: FontWeight.Lighter,
                        colors: this.isDay ? ['#1A1A1A', '#3B82F6'] : ['#F2F2F2', '#7EA6F0']
                    });
                }
            }, { name: "GradientText" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.condition);
            Text.fontSize(17);
            Text.fontColor('#3F3F3F');
            Text.letterSpacing(0.3);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.high > -900 && this.low > -900) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 12 });
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`↑ ${this.convert(this.high)}°`);
                        Text.fontSize(14);
                        Text.fontColor('#3F3F3F');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`↓ ${this.convert(this.low)}°`);
                        Text.fontSize(14);
                        Text.fontColor('#3F3F3F');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.apparent > -900) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`｜ ${this.convert(this.apparent)}°`);
                                    Text.fontSize(14);
                                    Text.fontColor('#595959');
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
        if ("weatherCode" in params) {
            this.updateParam("weatherCode", params.weatherCode);
        }
        if ("isDay" in params) {
            this.updateParam("isDay", params.isDay);
        }
        if ("materialTier" in params) {
            this.updateParam("materialTier", params.materialTier);
        }
        if ("high" in params) {
            this.updateParam("high", params.high);
        }
        if ("low" in params) {
            this.updateParam("low", params.low);
        }
        if ("apparent" in params) {
            this.updateParam("apparent", params.apparent);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
