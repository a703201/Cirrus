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
        this.initParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
    }
    @Param
    readonly pageStack: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding(16);
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数据源
            Row.create({ space: 8 });
            // 数据源
            Row.width('100%');
            // 数据源
            Row.padding(14);
            // 数据源
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 数据源
            Row.borderRadius(12);
            // 数据源
            Row.accessibilityGroup(true);
            // 数据源
            Row.bindMenu({ builder: this.sourceMenu.bind(this) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331685, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sourceLabel());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 数据源
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 单位
            Row.create({ space: 8 });
            // 单位
            Row.width('100%');
            // 单位
            Row.padding(14);
            // 单位
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 单位
            Row.borderRadius(12);
            // 单位
            Row.accessibilityGroup(true);
            // 单位
            Row.bindMenu({ builder: this.unitMenu.bind(this) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331690, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.unitLabel());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 单位
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主题
            Row.create({ space: 8 });
            // 主题
            Row.width('100%');
            // 主题
            Row.padding(14);
            // 主题
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 主题
            Row.borderRadius(12);
            // 主题
            Row.accessibilityGroup(true);
            // 主题
            Row.bindMenu({ builder: this.themeMenu.bind(this) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331686, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.themeLabel());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 主题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 沉浸光感
            Row.create({ space: 8 });
            // 沉浸光感
            Row.width('100%');
            // 沉浸光感
            Row.padding(14);
            // 沉浸光感
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 沉浸光感
            Row.borderRadius(12);
            // 沉浸光感
            Row.accessibilityGroup(true);
            // 沉浸光感
            Row.bindMenu({ builder: this.materialMenu.bind(this) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331683, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.materialLabel());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 沉浸光感
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 语言
            Row.create({ space: 8 });
            // 语言
            Row.width('100%');
            // 语言
            Row.padding(14);
            // 语言
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 语言
            Row.borderRadius(12);
            // 语言
            Row.accessibilityGroup(true);
            // 语言
            Row.bindMenu({ builder: this.languageMenu.bind(this) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331681, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.languageLabel());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 语言
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数据与隐私（二级页面）
            Row.create({ space: 8 });
            // 数据与隐私（二级页面）
            Row.width('100%');
            // 数据与隐私（二级页面）
            Row.padding(14);
            // 数据与隐私（二级页面）
            Row.backgroundColor('rgba(255,255,255,0.6)');
            // 数据与隐私（二级页面）
            Row.borderRadius(12);
            // 数据与隐私（二级页面）
            Row.accessibilityGroup(true);
            // 数据与隐私（二级页面）
            Row.onClick(() => {
                this.pageStack.pushPath({ name: 'Privacy' });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331684, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        // 数据与隐私（二级页面）
        Row.pop();
        Column.pop();
    }
    sourceMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 菜单弹窗上下文用 ForEach（Repeat 面向主列表树，弹窗内不保证渲染）。
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
            this.forEachUpdateFunction(elmtId, listSources(), forEachItemGenFunction, (src: WeatherSource) => src.id, false, false);
        }, ForEach);
        // 菜单弹窗上下文用 ForEach（Repeat 面向主列表树，弹窗内不保证渲染）。
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
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("pageStack" in params) {
            this.updateParam("pageStack", params.pageStack);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
