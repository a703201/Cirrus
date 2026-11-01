if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { WeatherAlert } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
export class AlertsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    private dark(): boolean {
        return themeModel.resolveDark();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding({ top: 60, left: 16, right: 16, bottom: 24 });
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.geometryTransition('geo-alerts');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((appStore.weather?.alerts?.length ?? 0) === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.padding(16);
                        Row.backgroundColor(Tokens.cardBg(this.dark()));
                        Row.borderRadius(Tokens.RADIUS_LG);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331676, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_BODY);
                        Text.fontColor(Tokens.subInk(this.dark()));
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 10 });
                        List.layoutWeight(1);
                        List.width('100%');
                        List.scrollBar(BarState.Off);
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
                                        Column.create({ space: 8 });
                                        Column.width('100%');
                                        Column.padding(16);
                                        Column.backgroundColor(Tokens.cardBg(this.dark()));
                                        Column.borderRadius(Tokens.RADIUS_LG);
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.accessibilityGroup(true);
                                        Column.accessibilityText(`${ri.item.level} ${ri.item.title} ${ri.item.description}`);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create({ space: 8 });
                                        Row.width('100%');
                                        Row.alignItems(VerticalAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.level);
                                        Text.fontSize(Tokens.FONT_CAPTION);
                                        Text.fontColor('#E5484D');
                                        Text.backgroundColor('rgba(229,72,77,0.14)');
                                        Text.borderRadius(6);
                                        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.title);
                                        Text.fontSize(Tokens.FONT_HEADLINE);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor(Tokens.ink(this.dark()));
                                        Text.layoutWeight(1);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.description);
                                        Text.fontSize(Tokens.FONT_CAPTION + 1);
                                        Text.fontColor(Tokens.subInk(this.dark()));
                                        Text.lineHeight(20);
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
