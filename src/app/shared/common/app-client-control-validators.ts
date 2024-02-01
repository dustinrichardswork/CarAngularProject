import { FormControl } from '@angular/forms';
import { ValidationResult } from './validation-result';
import { CommonValidators } from './common-validators';
import { AppValidators } from './app-validators';
import { ValidatorService } from 'angular-iban';



export class AppClientControlValidators {
  static isValidIban(control: FormControl): ValidationResult {
    if (control) {
      if (
        CommonValidators.isFilled(control.value) &&
        ValidatorService.validateIban(control)
      ) {
        return { iban: true };
      }
    }
    return null;
  }
}
