import { FormControl } from "@angular/forms";

export class AppValidators {

  public static autoComplateItemExist(helper) {
    return (control: FormControl): { [key: string]: any } => {
      if (!helper.source) {
        return { invalidValue: true };
      }

      if (typeof (control.value) === "string") {
        const filtredResult = helper.source.filter(x => x.name.toLowerCase() === control.value.toLowerCase());
        if (filtredResult.length < 1) {
          return { invalidValue: true };
        } else {
          control.setValue(filtredResult[0]);
          return null;
        }
      } else {
        if (helper.source.filter(x => x.name.toLowerCase() === control.value?.name.toLowerCase()).length < 1) {
          return { invalidValue: true };
        } else {
          return null;
        }
      }
    }
  }

}
