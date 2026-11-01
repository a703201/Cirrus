if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QWeatherKeyDialog_Params {
    controller?: CustomDialogController;
    input?: string;
    verifying?: boolean;
}
import promptAction from "@ohos:promptAction";
import { TemperatureUnit, ThemeMode, MaterialTier, Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { listAllSources, QWeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import type { WeatherSource } from "@bundle:com.Lumio.Cirrus/entry@data/ets/data/Index";
import { appStore } from "@bundle:com.Lumio.Cirrus/entry/ets/store/AppStore";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
export class SettingsPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("pageStack", (params && "pageStack" in params) ? params.pageStack : new NavPathStack());
        this.keyDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new QWeatherKeyDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/features/settings/SettingsPage.ets", line: 22, col: 14 });
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
    private keyDialog: CustomDialogController;
    private openKeyDialog(): void {
        this.keyDialog.open();
    }
    private async setLanguage(lang: string): Promise<void> {
        await appStore.updateSettings({ language: lang });
    }
    private dk(): boolean {
        return themeModel.resolveDark();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.align(Alignment.TopStart);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.padding({ top: 44, left: 16, right: 16, bottom: 108 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331694, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.letterSpacing(-0.6);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ── 外观 ──
            Column.create();
            // ── 外观 ──
            Column.width('100%');
            // ── 外观 ──
            Column.backgroundColor(Tokens.cardBg(this.dk()));
            // ── 外观 ──
            Column.borderRadius(Tokens.RADIUS_LG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.bindMenu({ builder: this.themeMenu.bind(this) }, { placement: Placement.BottomRight });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331686, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.themeLabel());
            Text.fontSize(Tokens.FONT_BODY);
            Text.fontColor(Tokens.subInk(this.dk()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color(Tokens.hairline(this.dk()));
            Divider.strokeWidth(0.5);
            Divider.margin({ left: 16, right: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.bindMenu({ builder: this.materialMenu.bind(this) }, { placement: Placement.BottomRight });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331683, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.materialLabel());
            Text.fontSize(Tokens.FONT_BODY);
            Text.fontColor(Tokens.subInk(this.dk()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color(Tokens.hairline(this.dk()));
            Divider.strokeWidth(0.5);
            Divider.margin({ left: 16, right: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.bindMenu({ builder: this.unitMenu.bind(this) }, { placement: Placement.BottomRight });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331690, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.unitLabel());
            Text.fontSize(Tokens.FONT_BODY);
            Text.fontColor(Tokens.subInk(this.dk()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        // ── 外观 ──
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ── 数据源 ──
            Column.create();
            // ── 数据源 ──
            Column.width('100%');
            // ── 数据源 ──
            Column.backgroundColor(Tokens.cardBg(this.dk()));
            // ── 数据源 ──
            Column.borderRadius(Tokens.RADIUS_LG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.bindMenu({ builder: this.sourceMenu.bind(this) }, { placement: Placement.BottomRight });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331685, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sourceLabel());
            Text.fontSize(Tokens.FONT_BODY);
            Text.fontColor(Tokens.subInk(this.dk()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (appStore.settings.sourceId === 'qweather') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.color(Tokens.hairline(this.dk()));
                        Divider.strokeWidth(0.5);
                        Divider.margin({ left: 16, right: 16 });
                    }, Divider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.width('100%');
                        Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
                        Row.accessibilityGroup(true);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331785, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_HEADLINE);
                        Text.fontColor(Tokens.ink(this.dk()));
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331789, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_BODY);
                        Text.fontColor(Tokens.subInk(this.dk()));
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 50331787, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
                        Text.fontSize(Tokens.FONT_BODY);
                        Text.fontColor(Tokens.accent(this.dk()));
                        Text.padding({ left: 10, right: 4, top: 4, bottom: 4 });
                        Text.onClick(() => {
                            this.openKeyDialog();
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // ── 数据源 ──
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ── 语言 ──
            Column.create();
            // ── 语言 ──
            Column.width('100%');
            // ── 语言 ──
            Column.backgroundColor(Tokens.cardBg(this.dk()));
            // ── 语言 ──
            Column.borderRadius(Tokens.RADIUS_LG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.bindMenu({ builder: this.languageMenu.bind(this) }, { placement: Placement.BottomRight });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331681, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.languageLabel());
            Text.fontSize(Tokens.FONT_BODY);
            Text.fontColor(Tokens.subInk(this.dk()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        // ── 语言 ──
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ── 更多（入口页）──
            Column.create();
            // ── 更多（入口页）──
            Column.width('100%');
            // ── 更多（入口页）──
            Column.backgroundColor(Tokens.cardBg(this.dk()));
            // ── 更多（入口页）──
            Column.borderRadius(Tokens.RADIUS_LG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.geometryTransition('geo-locations');
            Row.onClick(() => {
                this.pageStack.pushPath({ name: 'Locations' });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331693, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color(Tokens.hairline(this.dk()));
            Divider.strokeWidth(0.5);
            Divider.margin({ left: 16, right: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 15, bottom: 15 });
            Row.accessibilityGroup(true);
            Row.geometryTransition('geo-privacy');
            Row.onClick(() => {
                this.pageStack.pushPath({ name: 'Privacy' });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331684, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontColor(Tokens.ink(this.dk()));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(16);
            Text.fontColor(Tokens.sectionTitle(this.dk()));
            Text.accessibilityLevel('no');
        }, Text);
        Text.pop();
        Row.pop();
        // ── 更多（入口页）──
        Column.pop();
        Column.pop();
        Scroll.pop();
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
            MenuItem.create({ content: '中文' });
            MenuItem.selected(appStore.settings.language === 'zh-CN');
            MenuItem.onClick(() => {
                this.setLanguage('zh-CN');
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
            MenuItem.create({ content: 'Français' });
            MenuItem.selected(appStore.settings.language === 'fr-FR');
            MenuItem.onClick(() => {
                this.setLanguage('fr-FR');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '日本語' });
            MenuItem.selected(appStore.settings.language === 'ja-JP');
            MenuItem.onClick(() => {
                this.setLanguage('ja-JP');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '한국어' });
            MenuItem.selected(appStore.settings.language === 'ko-KR');
            MenuItem.onClick(() => {
                this.setLanguage('ko-KR');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: 'Español' });
            MenuItem.selected(appStore.settings.language === 'es-ES');
            MenuItem.onClick(() => {
                this.setLanguage('es-ES');
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: 'Deutsch' });
            MenuItem.selected(appStore.settings.language === 'de-DE');
            MenuItem.onClick(() => {
                this.setLanguage('de-DE');
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
        switch (appStore.settings.language) {
            case 'zh-CN':
                return '中文';
            case 'en':
                return 'English';
            case 'fr-FR':
                return 'Français';
            case 'ja-JP':
                return '日本語';
            case 'ko-KR':
                return '한국어';
            case 'es-ES':
                return 'Español';
            case 'de-DE':
                return 'Deutsch';
            default:
                return { "id": 50331682, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" };
        }
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
