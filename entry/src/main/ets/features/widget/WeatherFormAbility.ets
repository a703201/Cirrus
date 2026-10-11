import { FormExtensionAbility, formBindingData } from '@kit.FormKit';
import { Want } from '@kit.AbilityKit';
import { Log } from 'common';

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
