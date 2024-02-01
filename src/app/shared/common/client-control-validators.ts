import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CommonValidators } from './common-validators';
import { ValidationResult } from './validation-result';
import { Converters } from './converters';

export class ClientControlValidators {
  static toggleRequiredValidator(
    formGroup: FormGroup,
    enabled: boolean,
    controlNames: Array<string>,
  ) {
    this.toggleValidator(formGroup, enabled, controlNames, Validators.required);
  }

  static toggleValidator(
    formGroup: FormGroup,
    enabled: boolean,
    controlNames: Array<string>,
    validator: any,
    opts?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
  ) {
    controlNames.forEach((controlName) => {
      const control = formGroup.controls[controlName];
      if (control) {
        if (enabled === true) {
          control.validator = validator;
        } else {
          control.validator = null;
        }
        control.updateValueAndValidity(opts);
      }
    });
  }

  //date format validation
  static isValidDate(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isValidDate(controlValue) === false
      ) {
        return { date: true };
      }
    }
    return null;
  }

  //integer number validation
  static isValidIntegerNumber(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        CommonValidators.isFilled(controlValue) === false ||
        CommonValidators.isValidIntegerNumber(controlValue) === false
      ) {
        return { number: true };
      }
    }
    return null;
  }

  static isValidIntegerNumber2(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        CommonValidators.isFilled(controlValue) === false ||
        CommonValidators.isValidIntegerNumber2(controlValue) === false
      ) {
        return { number: true };
      }
    }
    return null;
  }

  //integer number validation
  static isValidNegativeNumber(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        parseFloat(controlValue) < 0
      ) {
        return { negative: true };
      }
    }
    return null;
  }

  static discountValueValidator(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;

      if (controlValue === null || control.value === '') {
        return null;
      }

      if (
        CommonValidators.isFilled(controlValue) === false ||
        CommonValidators.isValidFloatNumber(controlValue) === false
      ) {
        return { number: true };
      }

      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isValidFloatNumber(controlValue) === false
      ) {
        return { percent: true };
      }
    }

    return null;
  }

  //float number validation
  static isValidFloatNumber(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        CommonValidators.isFilled(controlValue) === false ||
        CommonValidators.isValidFloatNumber(controlValue) === false
      ) {
        return { number: true };
      }
    }
    return null;
  }

  //float number validation with negative number
  static isValidFloatNumber2(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        CommonValidators.isFilled(controlValue) === false ||
        CommonValidators.isValidFloatNumber2(controlValue) === false
      ) {
        return { number: true };
      }
    }
    return null;
  }

  //percent validation - integer number between 0 and 100
  static isValidPercent(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Number ? control.value.toString() : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isValidPercent(controlValue) === false
      ) {
        return { percent: true };
      }
    }
    return null;
  }

  //email validation
  static isValidEmail(control: FormControl): ValidationResult {
    if (control) {
      if (
        !CommonValidators.isNullOrEmpty(control.value) &&
        CommonValidators.isValidEmail(control.value) === false
      ) {
        return { email: true };
      }
    }
    return null;
  }

  //required radio buttons validation
  //radio buttons have to share one validator instance and the control value should be intance of RadioButtonState
  static radioRequired(c: FormControl): ValidationResult {
    const controls: FormControl[] = []; // remember all validated controls in the group
    if (controls.indexOf(c) < 0) {
      controls.push(c); // push control not yet in the array
    }
    for (let i = 0; i < controls.length; i++) {
      if (controls[i].value.checked) {
        return null; // one is checked so its valid
      }
    }
    return { radioRequired: true }; // none is in the checked state so its invalid};
  }

  //first day of month validation
  static isFirstDayOfMonth(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isFirstDayOfMonth(controlValue) === false
      ) {
        return { firstDayOfMonth: true };
      }
    }
    return null;
  }

  //check if the date is in future
  static isInFuture(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isInFuture(controlValue) === false
      ) {
        return { inFuture: true };
      }
    }
    return null;
  }

  //check if the date is today or in future
  static isInFutureOrToday(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isInFutureOrToday(controlValue) === false
      ) {
        return { inFutureOrToday: true };
      }
    }
    return null;
  }

  //check if the date is not today
  static isNotToday(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (CommonValidators.isFilled(controlValue) && CommonValidators.isToday(controlValue)) {
        return { isNotToday: true };
      }
    }
    return null;
  }

  //check if the date is in past
  static isInPast(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isInPast(controlValue) === false
      ) {
        return { inPast: true };
      }
    }
    return null;
  }

  //check if the date is in past or today
  static isInPastOrToday(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isInPast(controlValue) === false &&
        CommonValidators.isToday(controlValue) === false
      ) {
        return { inPastOrToday: true };
      }
    }
    return null;
  }

  //check if the date is not older then 6 months
  static isNotOlderThan6Months(control: FormControl): ValidationResult {
    if (control) {
      const controlValue: string =
        control.value instanceof Date ? Converters.dateToString(control.value) : control.value;
      if (
        CommonValidators.isFilled(controlValue) &&
        CommonValidators.isNotOlderThanXMonths(controlValue, 6) === false
      ) {
        return { isNotOlderThan6Months: true };
      }
    }
    return null;
  }

  /* banking */
  static isValidSwiftCode(control: FormControl): ValidationResult {
    if (control) {
      if (
        CommonValidators.isFilled(control.value) &&
        CommonValidators.isValidSwiftCode(control.value) === false
      ) {
        return { swiftcode: true };
      }
    }
    return null;
  }



  static phoneValidator(control: FormControl): ValidationResult {
    if (control) {
      if (
        CommonValidators.isFilled(control.value) &&
        CommonValidators.phoneValidator(control.value) === false
      ) {
        return { phonenumber: true };
      }
    }
    return null;

  }

  static number(prms = {}): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
      if(control) {
        let val: number = control.value;
        if(val == null) return null;
        if(isNaN(val) || /\D/.test(val.toString())) {
          
          return {"number": true};
        } else if(!isNaN(prms['min']) && !isNaN(prms['max'])) {
          
          return val < prms['min'] || val > prms['max'] ? {"number": true} : null;
        } else if(!isNaN(prms['min'])) {
          
          return val < prms['min'] ? {"number": true} : null;
        } else if(!isNaN(prms['max'])) {
          
          return val > prms['max'] ? {"number": true} : null;
        } else {          
          return null;
        }
      }
      return null;     
    };
  }
}
