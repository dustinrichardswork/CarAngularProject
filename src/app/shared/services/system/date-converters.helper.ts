//This utils class contains converting methods for working with Date

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class DateConverters {

  public static convertToDate(dt: NgbDateStruct): Date {
    if (!dt)
      return null;
    return new Date(dt.year, dt.month - 1, dt.day);
  }

  public static convertToNgbDate(dt: Date): NgbDateStruct {
    if (!dt)
      return null;
    return {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate()
    };
  }

  public static extractDate(date) {
    if (!date)
      return null;
    const dt = new Date(String(date));
    return new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
  }
}
