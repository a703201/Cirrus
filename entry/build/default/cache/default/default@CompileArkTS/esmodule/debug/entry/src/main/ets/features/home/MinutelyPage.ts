if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { MinutelyPoint } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export class MinutelyPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("minutely", (params && "minutely" in params) ? params.minutely : undefined);
        this.initParam("summary", (params && "summary" in params) ? params.summary : '');
        this.initParam("dark", (params && "dark" in params) ? params.dark : false);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("minutely", (params && "minutely" in params) ? params.minutely : undefined);
        this.resetParam("summary", (params && "summary" in params) ? params.summary : '');
        this.resetParam("dark", (params && "dark" in params) ? params.dark : false);
    }
    @Param
    readonly minutely: MinutelyPoint[] | undefined;
    @Param
    readonly summary: string;
    @Param
    readonly dark: boolean;
    private maxPrecip(): number {
        let m: number = 0;
        const list: MinutelyPoint[] = this.minutely ?? [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].precip > m) {
                m = list[i].precip;
            }
        }
        return m;
    }
    private barHeight(p: number): number {
        const max: number = Math.max(this.maxPrecip(), 0.1);
        return Math.max(4, Math.round(44 * p / max));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.minutely?.length ?? 0) > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 10 });
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331779, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_CAPTION + 1);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor(Tokens.sectionTitle(this.dark));
                        Text.letterSpacing(0.4);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 8 });
                        Column.width('100%');
                        Column.padding(14);
                        Column.backgroundColor(Tokens.cardBg(this.dark));
                        Column.borderRadius(Tokens.RADIUS_LG);
                        Column.alignItems(HorizontalAlign.Start);
                        Column.accessibilityGroup(true);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.summary.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.summary);
                                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                                    Text.fontColor(Tokens.subInk(this.dark));
                                    Text.maxLines(2);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else if (this.maxPrecip() <= 0) {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create({ "id": 50331780, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                    Text.fontSize(Tokens.FONT_CAPTION + 1);
                                    Text.fontColor(Tokens.subInk(this.dark));
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(2, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 3 });
                        Row.width('100%');
                        Row.height(48);
                        Row.alignItems(VerticalAlign.Bottom);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Repeat<MinutelyPoint>(this.minutely ?? [], this).each((ri: RepeatItem<MinutelyPoint>) => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.layoutWeight(1);
                                Column.height(this.barHeight(ri.item.precip));
                                Column.backgroundColor(Tokens.accent(this.dark));
                                Column.borderRadius(3);
                            }, Column);
                            Column.pop();
                        })
                            .key((m: MinutelyPoint) => m.time.toString()).render(isInitialRender);
                    }, Repeat);
                    Row.pop();
                    Column.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("minutely" in params) {
            this.updateParam("minutely", params.minutely);
        }
        if ("summary" in params) {
            this.updateParam("summary", params.summary);
        }
        if ("dark" in params) {
            this.updateParam("dark", params.dark);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
