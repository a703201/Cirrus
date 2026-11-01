if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Tokens } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
import { themeModel } from "@bundle:com.Lumio.Cirrus/entry/ets/store/ThemeModel";
export class PrivacyView extends ViewV2 {
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
            Column.geometryTransition('geo-privacy');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.width('100%');
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
        }, Column);
        this.dataFlowCard.bind(this)();
        this.permissionsCard.bind(this)();
        this.thirdPartyCard.bind(this)();
        this.policyCard.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331750, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_CAPTION);
            Text.fontColor(Tokens.sectionTitle(this.dark()));
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    dataFlowCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Tokens.cardBg(this.dark()));
            Column.borderRadius(Tokens.RADIUS_LG);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331739, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.ink(this.dark()));
        }, Text);
        Text.pop();
        this.itemRow.bind(this)({ "id": 50331745, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331744, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331741, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331740, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331749, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331748, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331747, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331746, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331743, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331742, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        Column.pop();
    }
    permissionsCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Tokens.cardBg(this.dark()));
            Column.borderRadius(Tokens.RADIUS_LG);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331757, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.ink(this.dark()));
        }, Text);
        Text.pop();
        this.itemRow.bind(this)({ "id": 50331752, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331751, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331754, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331753, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331756, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331755, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        Column.pop();
    }
    thirdPartyCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Tokens.cardBg(this.dark()));
            Column.borderRadius(Tokens.RADIUS_LG);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331773, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.ink(this.dark()));
        }, Text);
        Text.pop();
        this.itemRow.bind(this)({ "id": 50331772, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331771, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331775, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331774, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        Column.pop();
    }
    policyCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Tokens.cardBg(this.dark()));
            Column.borderRadius(Tokens.RADIUS_LG);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 50331770, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
            Text.fontSize(Tokens.FONT_HEADLINE);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.ink(this.dark()));
        }, Text);
        Text.pop();
        this.itemRow.bind(this)({ "id": 50331759, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331758, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331769, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331768, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331767, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331766, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331765, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331764, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331763, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331762, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        this.itemRow.bind(this)({ "id": 50331761, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" }, { "id": 50331760, "type": 10003, params: [], "bundleName": "com.Lumio.Cirrus", "moduleName": "entry" });
        Column.pop();
    }
    itemRow(label: Resource, body: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.accessibilityGroup(true);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(Tokens.FONT_CAPTION + 1);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Tokens.ink(this.dark()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(body);
            Text.fontSize(Tokens.FONT_CAPTION);
            Text.fontColor(Tokens.subInk(this.dark()));
            Text.lineHeight(20);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
