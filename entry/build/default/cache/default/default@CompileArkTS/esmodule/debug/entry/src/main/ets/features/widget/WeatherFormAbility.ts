import FormExtensionAbility from "@ohos:app.form.FormExtensionAbility";
import formBindingData from "@ohos:app.form.formBindingData";
import type Want from "@ohos:app.ability.Want";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/common/Index";
export default class WeatherFormAbility extends FormExtensionAbility {
    onAddForm(want: Want): formBindingData.FormBindingData {
        Log.i('WeatherFormAbility.onAddForm');
        return formBindingData.createFormBindingData({
            temperature: '--',
            condition: '',
            locationName: ''
        });
    }
    onUpdateForm(formId: string): void {
        Log.i(`WeatherFormAbility.onUpdateForm ${formId}`);
    }
    onRemoveForm(formId: string): void {
        Log.i(`WeatherFormAbility.onRemoveForm ${formId}`);
    }
}
