if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { MinutelyPoint } from 'common';
export class MinutelyPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("minutely", (params && "minutely" in params) ? params.minutely : undefined);
        this.initParam("summary", (params && "summary" in params) ? params.summary : '');
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("minutely", (params && "minutely" in params) ? params.minutely : undefined);
        this.resetParam("summary", (params && "summary" in params) ? params.summary : '');
    }
    @Param
    readonly minutely: MinutelyPoint[] | undefined;
    @Param
    readonly summary: string;
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
                        Text.fontSize(15);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#3A3A3A');
                        Text.letterSpacing(0.3);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 8 });
                        Column.width('100%');
                        Column.padding(14);
                        Column.backgroundColor('rgba(255,255,255,0.5)');
                        Column.borderRadius(20);
                        Column.alignItems(HorizontalAlign.Start);
                        Column.accessibilityGroup(true);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.summary.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.summary);
                                    Text.fontSize(13);
                                    Text.fontColor('#3F3F3F');
                                    Text.maxLines(2);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else if (this.maxPrecip() <= 0) {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create({ "id": 50331780, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                    Text.fontSize(13);
                                    Text.fontColor('#3F3F3F');
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
                                Column.backgroundColor('#3B82F6');
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
    }
    rerender() {
        this.updateDirtyElements();
    }
}
