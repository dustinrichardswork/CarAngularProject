import { FormGroup } from '@angular/forms';
import { isNumeric } from 'jquery';

export const controlHasErrorType = (
  form: FormGroup,
  controlName: string,
  errorName: string,
): boolean => {
  const control = form.get(controlName);

  if (!control) {
    return false;
  }

  return control.touched && (control.errors ? (control.errors[errorName] as boolean) : false);
};

export function ngbToUrlDateFormat(ngbDate) {
  if (ngbDate) {
    let result = ngbDate.year.toString();

    ngbDate.month = ngbDate.month.toString();
    result += ngbDate.month.length == 1 ? "0" + ngbDate.month : ngbDate.month;
    ngbDate.day = ngbDate.day.toString();
    result += ngbDate.day.length == 1 ? "0" + ngbDate.day : ngbDate.day;
    return result;
  }

  return null;
}

export function materialToUrlDateFormat(materialDate) {
  if (materialDate) {
    let result = materialDate.getFullYear().toString();

    materialDate.month = (materialDate.getMonth() + 1).toString();
    result += materialDate.month.length == 1 ? "0" + materialDate.month : materialDate.month;
    materialDate.day = materialDate.getDate().toString();
    result += materialDate.day.length == 1 ? "0" + materialDate.day : materialDate.day;
    return result;
  }

  return null;
}

export function urlToApiDateFormat(urlDate: string) {
  if (urlDate && urlDate.length == 8) {
    return `${urlDate.slice(4, 6)}/${urlDate.slice(6, 8)}/${urlDate.slice(0, 4)}`;
  }

  return null;
}


export function urlToNgbDateFormat(urlDate: string) {

  if (urlDate && urlDate.length == 8) {
    return { year: +(urlDate.slice(0, 4)), day: +(urlDate.slice(6, 8)), month: +(urlDate.slice(4, 6)) };
  }

  return null;
}

export function urlToMaterialDateFormat(urlDate: string) {

  if (urlDate && urlDate.length == 8) {
    return new Date(+(urlDate.slice(0, 4)), (+(urlDate.slice(4, 6))-1), +(urlDate.slice(6, 8)));
  }

  return null;
}
