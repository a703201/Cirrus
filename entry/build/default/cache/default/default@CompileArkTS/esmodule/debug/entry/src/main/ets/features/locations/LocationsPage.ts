if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { locationSubtitle, locationTitle, Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
export class LocationsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.query = '';
        this.initParam("compact", (params && "compact" in params) ? params.compact : false);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.query = '';
        this.resetParam("compact", (params && "compact" in params) ? params.compact : false);
    }
    @Local
    query: string;
    @Param
    readonly compact: boolean;
    private dark(): boolean {
        return themeModel.resolveDark();
    }
    private displayName(loc: LocationInfo): ResourceStr {
        return loc.name.length > 0 ? locationTitle(loc) : { "id": 50331655, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.padding({ top: this.compact ? 12 : 60, left: 16, right: 16, bottom: 24 });
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.geometryTransition('geo-locations');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 50331668, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, text: this.query });
            TextInput.onChange((v: string) => {
                this.query = v;
            });
            TextInput.onSubmit(() => {
                appStore.searchLocations(this.query);
            });
            TextInput.layoutWeight(1);
            TextInput.backgroundColor(Tokens.cardBg(this.dark()));
            TextInput.borderRadius(Tokens.RADIUS_MD);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331653, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.height(40);
            Button.borderRadius(Tokens.RADIUS_MD);
            Button.backgroundColor(Tokens.accent(this.dark()));
            Button.onClick(() => {
                appStore.searchLocations(this.query);
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331652, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.width('100%');
            Button.height(44);
            Button.borderRadius(Tokens.RADIUS_MD);
            Button.backgroundColor(Tokens.cardBg(this.dark()));
            Button.fontColor(Tokens.accent(this.dark()));
            Button.onClick(() => {
                appStore.useCurrentLocation();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.error.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(appStore.error);
                        Text.fontSize(Tokens.FONT_CAPTION);
                        Text.fontColor('#E5484D');
                        Text.width('100%');
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.searching) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331674, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_CAPTION);
                        Text.fontColor(Tokens.subInk(this.dark()));
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.searchResults.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331653, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_CAPTION);
                        Text.fontColor(Tokens.sectionTitle(this.dark()));
                        Text.letterSpacing(0.4);
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 8 });
                        List.width('100%');
                        List.constraintSize({ maxHeight: 240 });
                        List.scrollBar(BarState.Off);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Repeat<LocationInfo>(appStore.searchResults, this).each((ri: RepeatItem<LocationInfo>) => {
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding(14);
                                        Row.backgroundColor(Tokens.cardBg(this.dark()));
                                        Row.borderRadius(Tokens.RADIUS_MD);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create({ space: 2 });
                                        Column.layoutWeight(1);
                                        Column.alignItems(HorizontalAlign.Start);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(locationTitle(ri.item));
                                        Text.fontSize(Tokens.FONT_BODY);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor(Tokens.ink(this.dark()));
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (locationSubtitle(ri.item).length > 0) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(locationSubtitle(ri.item));
                                                    Text.fontSize(Tokens.FONT_CAPTION);
                                                    Text.fontColor(Tokens.subInk(this.dark()));
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
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel({ "id": 50331650, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                        Button.fontSize(Tokens.FONT_CAPTION);
                                        Button.height(32);
                                        Button.borderRadius(Tokens.RADIUS_SM);
                                        Button.backgroundColor(Tokens.accent(this.dark()));
                                        Button.onClick(() => {
                                            appStore.addLocation(ri.item);
                                        });
                                    }, Button);
                                    Button.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                observedDeepRender();
                            }
                        })
                            .key((l: LocationInfo) => l.id).render(isInitialRender);
                    }, Repeat);
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.layoutWeight(1);
            List.width('100%');
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<LocationInfo>(appStore.locations, this).each((ri: RepeatItem<LocationInfo>) => {
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding(14);
                            Row.backgroundColor(Tokens.cardBg(this.dark()));
                            Row.borderRadius(Tokens.RADIUS_MD);
                            Row.borderWidth(ri.item.id === appStore.currentId ? 1.5 : 0);
                            Row.borderColor(Tokens.accent(this.dark()));
                            Row.accessibilityGroup(true);
                            Row.onClick(() => {
                                appStore.selectLocation(ri.item.id);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create({ space: 2 });
                            Column.layoutWeight(1);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.displayName(ri.item));
                            Text.fontSize(Tokens.FONT_BODY);
                            Text.fontWeight(FontWeight.Medium);
                            Text.fontColor(Tokens.ink(this.dark()));
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (locationSubtitle(ri.item).length > 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(locationSubtitle(ri.item));
                                        Text.fontSize(Tokens.FONT_CAPTION);
                                        Text.fontColor(Tokens.subInk(this.dark()));
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (ri.item.id === appStore.defaultId) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create({ "id": 50331660, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                        Text.fontSize(Tokens.FONT_CAPTION);
                                        Text.fontColor(Tokens.accent(this.dark()));
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel({ "id": 50331654, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                            Button.fontSize(Tokens.FONT_CAPTION);
                            Button.height(30);
                            Button.borderRadius(Tokens.RADIUS_SM);
                            Button.backgroundColor(Tokens.accent(this.dark()));
                            Button.visibility(ri.item.id === appStore.defaultId ? Visibility.None : Visibility.Visible);
                            Button.onClick(() => {
                                appStore.setDefaultLocation(ri.item.id);
                            });
                        }, Button);
                        Button.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel({ "id": 50331651, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                            Button.fontSize(Tokens.FONT_CAPTION);
                            Button.height(30);
                            Button.borderRadius(Tokens.RADIUS_SM);
                            Button.fontColor('#E5484D');
                            Button.backgroundColor('rgba(229,72,77,0.12)');
                            Button.onClick(() => {
                                appStore.removeLocation(ri.item.id);
                            });
                        }, Button);
                        Button.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            })
                .key((l: LocationInfo) => l.id).render(isInitialRender);
        }, Repeat);
        List.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("compact" in params) {
            this.updateParam("compact", params.compact);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
