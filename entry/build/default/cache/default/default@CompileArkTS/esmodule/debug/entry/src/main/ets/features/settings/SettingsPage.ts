if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { TemperatureUnit, ThemeMode, MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { listSources } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import type { WeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
export class SettingsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.sourceSection.bind(this)();
        this.unitSection.bind(this)();
        this.themeSection.bind(this)();
        this.materialSection.bind(this)();
        this.languageSection.bind(this)();
        Column.pop();
    }
    sourceSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331685, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<WeatherSource>(listSources(), this).each((ri: RepeatItem<WeatherSource>) => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.padding(10);
                    Row.backgroundColor('rgba(255,255,255,0.6)');
                    Row.borderRadius(12);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(ri.item.displayName);
                    Text.fontSize(14);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Radio.create({ value: ri.item.id, group: 'source' });
                    Radio.checked(ri.item.id === appStore.settings.sourceId);
                    Radio.onChange((checked: boolean) => {
                        if (checked) {
                            appStore.updateSettings({ sourceId: ri.item.id });
                        }
                    });
                }, Radio);
                Row.pop();
            })
                .key((src: WeatherSource) => src.id).render(isInitialRender);
        }, Repeat);
        Column.pop();
    }
    unitSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331690, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331695, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: TemperatureUnit.CELSIUS, group: 'unit' });
            Radio.checked(appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS);
            Radio.onChange((checked: boolean) => {
                if (checked) {
                    appStore.updateSettings({ temperatureUnit: TemperatureUnit.CELSIUS });
                }
            });
        }, Radio);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331696, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: TemperatureUnit.FAHRENHEIT, group: 'unit' });
            Radio.checked(appStore.settings.temperatureUnit === TemperatureUnit.FAHRENHEIT);
            Radio.onChange((checked: boolean) => {
                if (checked) {
                    appStore.updateSettings({ temperatureUnit: TemperatureUnit.FAHRENHEIT });
                }
            });
        }, Radio);
        Row.pop();
        Row.pop();
        Column.pop();
    }
    themeSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331686, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.themeOption.bind(this)({ "id": 50331687, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, ThemeMode.AUTO);
        this.themeOption.bind(this)({ "id": 50331689, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, ThemeMode.LIGHT);
        this.themeOption.bind(this)({ "id": 50331688, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, ThemeMode.DARK);
        Row.pop();
        Column.pop();
    }
    themeOption(label: Resource, mode: ThemeMode, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: mode, group: 'theme' });
            Radio.checked(appStore.settings.theme === mode);
            Radio.onChange((checked: boolean) => {
                if (checked) {
                    appStore.updateSettings({ theme: mode });
                }
            });
        }, Radio);
        Row.pop();
    }
    materialSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331683, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
        }, Row);
        this.materialOption.bind(this)({ "id": 50331669, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, MaterialTier.AUTO);
        this.materialOption.bind(this)({ "id": 50331670, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, MaterialTier.EXQUISITE);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
        }, Row);
        this.materialOption.bind(this)({ "id": 50331671, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, MaterialTier.GENTLE);
        this.materialOption.bind(this)({ "id": 50331672, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, MaterialTier.SMOOTH);
        Row.pop();
        Column.pop();
    }
    materialOption(label: Resource, tier: MaterialTier, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: tier, group: 'material' });
            Radio.checked(appStore.settings.materialLevel === tier);
            Radio.onChange((checked: boolean) => {
                if (checked) {
                    appStore.updateSettings({ materialLevel: tier });
                }
            });
        }, Radio);
        Row.pop();
    }
    languageSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331681, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.languageOption.bind(this)({ "id": 50331682, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, 'system');
        this.languageOption.bind(this)('English', 'en');
        this.languageOption.bind(this)('中文', 'zh-CN');
        Row.pop();
        Column.pop();
    }
    languageOption(label: Resource | string, lang: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: lang, group: 'language' });
            Radio.checked(appStore.settings.language === lang);
            Radio.onChange((checked: boolean) => {
                if (checked) {
                    appStore.updateSettings({ language: lang });
                }
            });
        }, Radio);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
