if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { WeatherAlert } from 'common';
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
export class AlertsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.padding({ top: 44, left: 16, right: 16, bottom: 92 });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331691, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((appStore.weather?.alerts?.length ?? 0) === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331676, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(14);
                        Text.fontColor('#6B6B6B');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 8 });
                        List.layoutWeight(1);
                        List.width('100%');
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Repeat<WeatherAlert>(appStore.weather?.alerts ?? [], this).each((ri: RepeatItem<WeatherAlert>) => {
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create({ space: 4 });
                                        Column.padding(12);
                                        Column.backgroundColor('rgba(255,255,255,0.6)');
                                        Column.borderRadius(12);
                                        Column.width('100%');
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.accessibilityGroup(true);
                                        Column.accessibilityText(`${ri.item.level} ${ri.item.title} ${ri.item.description}`);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.alignItems(VerticalAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.level);
                                        Text.fontSize(12);
                                        Text.fontColor('#EF4444');
                                        Text.borderRadius(6);
                                        Text.borderWidth(1);
                                        Text.borderColor('#EF4444');
                                        Text.padding({ left: 6, right: 6, top: 1, bottom: 1 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.title);
                                        Text.fontSize(16);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.layoutWeight(1);
                                        Text.margin({ left: 8 });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.description);
                                        Text.fontSize(13);
                                        Text.fontColor('#4A4A4A');
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                observedDeepRender();
                            }
                        })
                            .key((a: WeatherAlert) => a.title).render(isInitialRender);
                    }, Repeat);
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
