if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class AnimatedNumber extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("value", (params && "value" in params) ? params.value : '');
        this.initParam("fontSize", (params && "fontSize" in params) ? params.fontSize : 72);
        this.initParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : FontWeight.Lighter);
        this.initParam("fontColor", (params && "fontColor" in params) ? params.fontColor : '#1A1A1A');
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("value", (params && "value" in params) ? params.value : '');
        this.resetParam("fontSize", (params && "fontSize" in params) ? params.fontSize : 72);
        this.resetParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : FontWeight.Lighter);
        this.resetParam("fontColor", (params && "fontColor" in params) ? params.fontColor : '#1A1A1A');
    }
    @Param
    readonly value: string;
    @Param
    readonly fontSize: number;
    @Param
    readonly fontWeight: FontWeight;
    @Param
    readonly fontColor: ResourceColor;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.value);
            Text.fontSize(this.fontSize);
            Text.fontWeight(this.fontWeight);
            Text.fontColor(this.fontColor);
            Text.contentTransition(new NumericTextTransition({ enableBlur: true }));
        }, Text);
        Text.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("value" in params) {
            this.updateParam("value", params.value);
        }
        if ("fontSize" in params) {
            this.updateParam("fontSize", params.fontSize);
        }
        if ("fontWeight" in params) {
            this.updateParam("fontWeight", params.fontWeight);
        }
        if ("fontColor" in params) {
            this.updateParam("fontColor", params.fontColor);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
