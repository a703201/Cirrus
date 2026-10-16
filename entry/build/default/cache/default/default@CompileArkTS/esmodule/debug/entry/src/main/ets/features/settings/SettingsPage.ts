if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QWeatherKeyDialog_Params {
    controller?: CustomDialogController;
    input?: string;
    verifying?: boolean;
}
import promptAction from "@ohos:promptAction";
import { TemperatureUnit, ThemeMode, MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { listAllSources, QWeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import type { WeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
export class SettingsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
        this.keyDialog = new CustomDialogController({
            // ⚠️ builder 必须是**调用形式** `Struct({})`（SDK 官方写法）。传裸 struct 引用会让框架
            // 在 open() 时对它 `new`，而 @CustomDialog struct 不能被 new → 运行时报
            // "TypeError: class constructor cannot call"（17:35 崩溃根因）。
            builder: () => {
                let jsDialog = new QWeatherKeyDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/features/settings/SettingsPage.ets", line: 24, col: 14 });
                jsDialog.setController(this.keyDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Center,
            autoCancel: true
        }, this);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
    }
    @Param
    readonly pageStack: NavPathStack;
    /** 和风 API Key 配置弹窗控制器（普通成员，不加 @State）。 */
    private keyDialog: CustomDialogController;
    private openKeyDialog(): void {
        this.keyDialog.open();
    }
    /** 语言切换需冷启动才生效（i18n 资源加载机制），给用户明确提示。 */
    private async setLanguage(lang: string): Promise<void> {
        await appStore.updateSettings({ language: lang });
        promptAction.showToast({ message: { "id": 50331788, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding({ top: 44, left: 16, right: 16, bottom: 92 });
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
            Row.bindMenu({ builder: this.sourceMenu.bind(this) }, { placement: Placement.BottomRight });
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
            If.create();
            // 和风天气 API Key：仅在数据源切到和风时出现；右侧「编辑」唤起配置弹窗。
            if (appStore.settings.sourceId === 'qweather') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.width('100%');
                        Row.padding(14);
                        Row.backgroundColor('rgba(255,255,255,0.6)');
                        Row.borderRadius(12);
                        Row.accessibilityGroup(true);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331785, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(16);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331789, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331787, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(14);
                        Text.fontColor('#3B82F6');
                        Text.padding({ left: 10, right: 10, top: 4, bottom: 4 });
                        Text.onClick(() => {
                            this.openKeyDialog();
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            // 单位
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
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
            Row.bindMenu({ builder: this.unitMenu.bind(this) }, { placement: Placement.BottomRight });
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
            Row.bindMenu({ builder: this.themeMenu.bind(this) }, { placement: Placement.BottomRight });
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
            Row.bindMenu({ builder: this.materialMenu.bind(this) }, { placement: Placement.BottomRight });
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
            Row.bindMenu({ builder: this.languageMenu.bind(this) }, { placement: Placement.BottomRight });
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
            // 列出全部已注册源：未配置 Key 的和风显示为「未配置」，点击直接唤起配置弹窗
            //（若过滤掉，用户将没有任何入口去填 Key）。
            // content 里的 $r() 必须**就地内联**：经方法间接返回的 Resource 在弹窗的独立
            // 渲染节点上解析不到，框架会报 "MenuItem content or label is empty" 且菜单项无字。
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const src = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    MenuItem.create({
                        content: src.needApiKey && !src.isAvailable()
                            ? { "id": 50331793, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } : src.displayName
                    });
                    MenuItem.selected(src.id === appStore.settings.sourceId);
                    MenuItem.onClick(() => {
                        if (!src.isAvailable()) {
                            this.openKeyDialog();
                            return;
                        }
                        appStore.updateSettings({ sourceId: src.id });
                    });
                }, MenuItem);
                MenuItem.pop();
            };
            this.forEachUpdateFunction(elmtId, listAllSources(), forEachItemGenFunction, (src: WeatherSource) => src.id, false, false);
        }, ForEach);
        // 列出全部已注册源：未配置 Key 的和风显示为「未配置」，点击直接唤起配置弹窗
        //（若过滤掉，用户将没有任何入口去填 Key）。
        // content 里的 $r() 必须**就地内联**：经方法间接返回的 Resource 在弹窗的独立
        // 渲染节点上解析不到，框架会报 "MenuItem content or label is empty" 且菜单项无字。
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
                this.setLanguage('system');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: 'English' });
            MenuItem.selected(appStore.settings.language === 'en');
            MenuItem.onClick(() => {
                this.setLanguage('en');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '中文' });
            MenuItem.selected(appStore.settings.language === 'zh-CN');
            MenuItem.onClick(() => {
                this.setLanguage('zh-CN');
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    private sourceLabel(): string {
        const list: WeatherSource[] = listAllSources();
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
class QWeatherKeyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.__input = new ObservedPropertySimplePU('', this, "input");
        this.__verifying = new ObservedPropertySimplePU(false, this, "verifying");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QWeatherKeyDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.input !== undefined) {
            this.input = params.input;
        }
        if (params.verifying !== undefined) {
            this.verifying = params.verifying;
        }
    }
    updateStateVars(params: QWeatherKeyDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__input.purgeDependencyOnElmtId(rmElmtId);
        this.__verifying.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__input.aboutToBeDeleted();
        this.__verifying.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __input: ObservedPropertySimplePU<string>;
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    private __verifying: ObservedPropertySimplePU<boolean>;
    get verifying() {
        return this.__verifying.get();
    }
    set verifying(newValue: boolean) {
        this.__verifying.set(newValue);
    }
    private close(): void {
        if (this.controller) {
            this.controller.close();
        }
    }
    /** 保存：先打一次官方轻量接口校验，**仅校验通过才落盘**（无效或断网均不保存）。 */
    private async save(): Promise<void> {
        const key: string = this.input.trim();
        if (key.length === 0) {
            promptAction.showToast({ message: { "id": 50331792, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            return;
        }
        this.verifying = true;
        const ok: boolean = await QWeatherSource.verify(key);
        this.verifying = false;
        if (!ok) {
            promptAction.showToast({ message: { "id": 50331783, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
            return;
        }
        await appStore.updateSettings({ qweatherApiKey: key });
        promptAction.showToast({ message: { "id": 50331784, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
        this.close();
    }
    /** 清除本机 Key：和风源随即不可用，若正在使用会自动回落默认源。 */
    private async clear(): Promise<void> {
        await appStore.updateSettings({ qweatherApiKey: '' });
        promptAction.showToast({ message: { "id": 50331781, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" } });
        this.close();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.padding(20);
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331791, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331790, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(13);
            Text.fontColor('#595959');
            Text.lineHeight(19);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 50331782, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, text: this.input });
            TextInput.type(InputType.Password);
            TextInput.onChange((v: string) => {
                this.input = v;
            });
            TextInput.width('100%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.settings.qweatherApiKey.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel({ "id": 50331777, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Button.layoutWeight(1);
                        Button.onClick(() => {
                            this.clear();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331786, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.close();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 50331778, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Button.layoutWeight(1);
            Button.enabled(!this.verifying);
            Button.onClick(() => {
                this.save();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
