if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WeatherForm_Params {
    locationName?: string;
    temperature?: string;
    condition?: string;
    tempMax?: string;
    tempMin?: string;
    updatedAt?: string;
}
class WeatherForm extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WeatherForm_Params) {
    }
    updateStateVars(params: WeatherForm_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__locationName.purgeDependencyOnElmtId(rmElmtId);
        this.__temperature.purgeDependencyOnElmtId(rmElmtId);
        this.__condition.purgeDependencyOnElmtId(rmElmtId);
        this.__tempMax.purgeDependencyOnElmtId(rmElmtId);
        this.__tempMin.purgeDependencyOnElmtId(rmElmtId);
        this.__updatedAt.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__locationName.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__condition.aboutToBeDeleted();
        this.__tempMax.aboutToBeDeleted();
        this.__tempMin.aboutToBeDeleted();
        this.__updatedAt.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __locationName: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('locationName', '', "locationName");
    get locationName() {
        return this.__locationName.get();
    }
    set locationName(newValue: string) {
        this.__locationName.set(newValue);
    }
    private __temperature: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('temperature', '--', "temperature");
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: string) {
        this.__temperature.set(newValue);
    }
    private __condition: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('condition', '', "condition");
    get condition() {
        return this.__condition.get();
    }
    set condition(newValue: string) {
        this.__condition.set(newValue);
    }
    private __tempMax: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('tempMax', '', "tempMax");
    get tempMax() {
        return this.__tempMax.get();
    }
    set tempMax(newValue: string) {
        this.__tempMax.set(newValue);
    }
    private __tempMin: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('tempMin', '', "tempMin");
    get tempMin() {
        return this.__tempMin.get();
    }
    set tempMin(newValue: string) {
        this.__tempMin.set(newValue);
    }
    private __updatedAt: ObservedPropertyAbstractPU<string> = this.createLocalStorageProp<string>('updatedAt', '', "updatedAt");
    get updatedAt() {
        return this.__updatedAt.get();
    }
    set updatedAt(newValue: string) {
        this.__updatedAt.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.width('100%');
            Column.height('100%');
            Column.padding(14);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#F4F8FD');
            Column.borderRadius(16);
            Column.onClick(() => {
                postCardAction(this, {
                    action: 'router',
                    abilityName: 'EntryAbility',
                    params: { targetPage: 'pages/Index' }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.locationName);
            Text.fontSize(12);
            Text.fontColor('#7A8190');
            Text.layoutWeight(1);
            Text.maxLines(1);
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.updatedAt);
            Text.fontSize(10);
            Text.fontColor('#9AA0A6');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.temperature);
            Text.fontSize(34);
            Text.fontWeight(FontWeight.Lighter);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 3 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.condition);
            Text.fontSize(13);
            Text.fontColor('#4A4A4A');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.tempMax) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.tempMax);
                        Text.fontSize(11);
                        Text.fontColor('#6B6B6B');
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
            if (this.tempMin) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.tempMin);
                        Text.fontSize(11);
                        Text.fontColor('#6B6B6B');
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
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__locationName.resetSource();
        this.__temperature.resetSource();
        this.__condition.resetSource();
        this.__tempMax.resetSource();
        this.__tempMin.resetSource();
        this.__updatedAt.resetSource();
    }
    static getEntryName(): string {
        return "WeatherForm";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new WeatherForm(undefined, {}), "com.Lumio.Cirrus/entry/ets/features/widget/WeatherForm");
ViewStackProcessor.StopGetAccessRecording();
