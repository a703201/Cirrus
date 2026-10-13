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
            Column.create({ space: 12 });
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.optionRow.bind(this)({ "id": 50331685, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, this.sourceLabel(), this.sourceMenu);
        this.optionRow.bind(this)({ "id": 50331690, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, this.unitLabel(), this.unitMenu);
        this.optionRow.bind(this)({ "id": 50331686, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, this.themeLabel(), this.themeMenu);
        this.optionRow.bind(this)({ "id": 50331683, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, this.materialLabel(), this.materialMenu);
        this.optionRow.bind(this)({ "id": 50331681, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, this.languageLabel(), this.languageMenu);
        Column.pop();
    }
    /** 统一的「标签 + 当前值 + 指示箭头」下拉行；菜单由 `menu` builder 经 bindMenu 弹出。 */
    optionRow(label: Resource, current: ResourceStr, menu: CustomBuilder, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding(14);
            Row.backgroundColor('rgba(255,255,255,0.6)');
            Row.borderRadius(12);
            Row.bindMenu(menu);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(current);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
    }
    sourceMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const src = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    MenuItem.create({ content: src.displayName });
                    MenuItem.selected(src.id === appStore.settings.sourceId);
                    MenuItem.onClick(() => {
                        appStore.updateSettings({ sourceId: src.id });
                    });
                }, MenuItem);
                MenuItem.pop();
            };
            this.forEachUpdateFunction(elmtId, listSources(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Menu.pop();
    }
    unitMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331695, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS);
            MenuItem.onClick(() => {
                appStore.updateSettings({ temperatureUnit: TemperatureUnit.CELSIUS });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331696, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.temperatureUnit === TemperatureUnit.FAHRENHEIT);
            MenuItem.onClick(() => {
                appStore.updateSettings({ temperatureUnit: TemperatureUnit.FAHRENHEIT });
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    themeMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331687, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.theme === ThemeMode.AUTO);
            MenuItem.onClick(() => {
                appStore.updateSettings({ theme: ThemeMode.AUTO });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331689, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.theme === ThemeMode.LIGHT);
            MenuItem.onClick(() => {
                appStore.updateSettings({ theme: ThemeMode.LIGHT });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331688, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.theme === ThemeMode.DARK);
            MenuItem.onClick(() => {
                appStore.updateSettings({ theme: ThemeMode.DARK });
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    materialMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331669, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.materialLevel === MaterialTier.AUTO);
            MenuItem.onClick(() => {
                appStore.updateSettings({ materialLevel: MaterialTier.AUTO });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331670, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.materialLevel === MaterialTier.EXQUISITE);
            MenuItem.onClick(() => {
                appStore.updateSettings({ materialLevel: MaterialTier.EXQUISITE });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331671, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.materialLevel === MaterialTier.GENTLE);
            MenuItem.onClick(() => {
                appStore.updateSettings({ materialLevel: MaterialTier.GENTLE });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331672, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.materialLevel === MaterialTier.SMOOTH);
            MenuItem.onClick(() => {
                appStore.updateSettings({ materialLevel: MaterialTier.SMOOTH });
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    languageMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: { "id": 50331682, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            MenuItem.selected(appStore.settings.language === 'system');
            MenuItem.onClick(() => {
                appStore.updateSettings({ language: 'system' });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: 'English' });
            MenuItem.selected(appStore.settings.language === 'en');
            MenuItem.onClick(() => {
                appStore.updateSettings({ language: 'en' });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '中文' });
            MenuItem.selected(appStore.settings.language === 'zh-CN');
            MenuItem.onClick(() => {
                appStore.updateSettings({ language: 'zh-CN' });
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    private sourceLabel(): string {
        const list: WeatherSource[] = listSources();
        const found: WeatherSource | undefined = list.find((s: WeatherSource) => s.id === appStore.settings.sourceId);
        return found ? found.displayName : '';
    }
    private unitLabel(): Resource {
        return appStore.settings.temperatureUnit === TemperatureUnit.CELSIUS
            ? { "id": 50331695, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } : { "id": 50331696, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    private themeLabel(): Resource {
        if (appStore.settings.theme === ThemeMode.LIGHT) {
            return { "id": 50331689, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
        if (appStore.settings.theme === ThemeMode.DARK) {
            return { "id": 50331688, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
        return { "id": 50331687, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    private materialLabel(): Resource {
        if (appStore.settings.materialLevel === MaterialTier.EXQUISITE) {
            return { "id": 50331670, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
        if (appStore.settings.materialLevel === MaterialTier.GENTLE) {
            return { "id": 50331671, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
        if (appStore.settings.materialLevel === MaterialTier.SMOOTH) {
            return { "id": 50331672, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
        return { "id": 50331669, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    private languageLabel(): ResourceStr {
        if (appStore.settings.language === 'en') {
            return 'English';
        }
        if (appStore.settings.language === 'zh-CN') {
            return '中文';
        }
        return { "id": 50331682, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
    }
    rerender() {
        this.updateDirtyElements();
    }
}
