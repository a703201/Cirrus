if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class GradientText extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("fontSize", (params && "fontSize" in params) ? params.fontSize : 72);
        this.initParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : FontWeight.Lighter);
        this.initParam("colors", (params && "colors" in params) ? params.colors : ['#F59E0B', '#3B82F6']);
        this.initParam("flip", (params && "flip" in params) ? params.flip : true);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("fontSize", (params && "fontSize" in params) ? params.fontSize : 72);
        this.resetParam("fontWeight", (params && "fontWeight" in params) ? params.fontWeight : FontWeight.Lighter);
        this.resetParam("colors", (params && "colors" in params) ? params.colors : ['#F59E0B', '#3B82F6']);
        this.resetParam("flip", (params && "flip" in params) ? params.flip : true);
    }
    @Param
    readonly text: string;
    @Param
    readonly fontSize: number;
    @Param
    readonly fontWeight: FontWeight;
    @Param
    readonly colors: ResourceColor[];
    @Param
    readonly flip: boolean;
    /**
     * `LinearGradientStyle` expects color stops `[ResourceColor, number][]` (color + position
     * weight in 0..1), not a bare `ResourceColor[]`. Build evenly spaced stops from the colors.
     */
    private gradientStops(): Array<[
        ResourceColor,
        number
    ]> {
        const stops: Array<[
            ResourceColor,
            number
        ]> = [];
        const n: number = this.colors.length;
        for (let i = 0; i < n; i++) {
            const weight: number = n > 1 ? i / (n - 1) : 0;
            stops.push([this.colors[i], weight]);
        }
        return stops;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.fontSize(this.fontSize);
            Text.fontWeight(this.fontWeight);
            Text.contentTransition(this.flip ? new NumericTextTransition({ enableBlur: true }) : undefined);
            Text.shaderStyle(new LinearGradientStyle({ colors: this.gradientStops(), direction: GradientDirection.Bottom }));
        }, Text);
        Text.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("fontSize" in params) {
            this.updateParam("fontSize", params.fontSize);
        }
        if ("fontWeight" in params) {
            this.updateParam("fontWeight", params.fontWeight);
        }
        if ("colors" in params) {
            this.updateParam("colors", params.colors);
        }
        if ("flip" in params) {
            this.updateParam("flip", params.flip);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
