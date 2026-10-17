if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { locationSubtitle } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import type { LocationInfo } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
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
    /** true 时作为大屏侧栏（紧凑、无大标题）。 */
    @Param
    readonly compact: boolean;
    private displayName(loc: LocationInfo): ResourceStr {
        return loc.name.length > 0 ? loc.name : { "id": 50331655, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding({ top: this.compact ? 12 : 44, left: 14, right: 14, bottom: 92 });
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.compact) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331693, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(20);
                        Text.fontWeight(FontWeight.Medium);
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
            Row.create({ space: 8 });
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
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331653, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.onClick(() => {
                appStore.searchLocations(this.query);
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331652, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.width('100%');
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
                        Text.fontSize(12);
                        Text.fontColor('#EF4444');
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.searchResults.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 8 });
                        List.width('100%');
                        List.constraintSize({ maxHeight: 220 });
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
                                        Row.backgroundColor('rgba(255,255,255,0.6)');
                                        Row.borderRadius(14);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create({ space: 2 });
                                        Column.layoutWeight(1);
                                        Column.alignItems(HorizontalAlign.Start);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(ri.item.name);
                                        Text.fontSize(15);
                                        Text.fontColor('#1A1A1A');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (locationSubtitle(ri.item).length > 0) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(locationSubtitle(ri.item));
                                                    Text.fontSize(12);
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
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel({ "id": 50331650, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                        Button.fontSize(12);
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
                            Row.backgroundColor(ri.item.id === appStore.currentId ? 'rgba(59,130,246,0.14)' : 'rgba(255,255,255,0.6)');
                            Row.borderRadius(14);
                            Row.borderWidth(ri.item.id === appStore.currentId ? 1 : 0);
                            Row.borderColor('#3B82F6');
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
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Medium);
                            Text.fontColor('#1A1A1A');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (locationSubtitle(ri.item).length > 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(locationSubtitle(ri.item));
                                        Text.fontSize(12);
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (ri.item.id === appStore.defaultId) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create({ "id": 50331660, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                                        Text.fontSize(12);
                                        Text.fontColor('#3B82F6');
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
                            Button.fontSize(12);
                            Button.backgroundColor('#3B82F6');
                            Button.fontColor('#FFFFFF');
                            Button.visibility(ri.item.id === appStore.defaultId ? Visibility.None : Visibility.Visible);
                            Button.onClick(() => {
                                appStore.setDefaultLocation(ri.item.id);
                            });
                        }, Button);
                        Button.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                            Button.createWithLabel({ "id": 50331651, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                            // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                            Button.fontSize(12);
                            // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                            Button.fontColor('#C5221F');
                            // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                            Button.backgroundColor('rgba(239,68,68,0.12)');
                            // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
                            Button.onClick(() => {
                                appStore.removeLocation(ri.item.id);
                            });
                        }, Button);
                        // 危险操作用「浅红底 + 深红字」，红字压在默认蓝底上几乎不可读。
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
