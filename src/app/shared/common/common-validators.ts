import { Converters } from './converters';

export class CommonValidators {
  public static ReqiredKey = 'nodata';
  public static ReqiredMessageKey = 'nodataErrorMessage';
  public static namePattern =
    'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F\u0200-\u021B\u1E02-\u1EF3';
  public static specCharsPattern = '’\\-\\.\\s';
  public static nameRegExp = new RegExp(
    '^[' +
      CommonValidators.namePattern +
      '][0-9' +
      CommonValidators.namePattern +
      CommonValidators.specCharsPattern +
      ']{2,200}$',
    'g',
  );
  private static yearMin = 1900;
  private static yearMax = 2100;

  //string is empty
  static isNullOrEmpty(input: string): boolean {
    return input === undefined || input === null || input === '';
  }

  //string is empty or white space
  static isNullOrWhiteSpace(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return true;
    return input.toString().trim().length === 0;
  }

  //string is not empty or white space
  static isFilled(input: any): boolean {
    return CommonValidators.isNullOrWhiteSpace(input) === false;
  }

  //integer validation
  static isValidIntegerNumber(input: string): boolean {
    const number = parseInt(input, 10);
    if (isNaN(number) || /^\d{1,10}$/.test(input) === false) return false;
    return number >= 0 && number <= 2147483647;
  }

  static isValidIntegerNumber2(input: string): boolean {
    const number = parseInt(input, 10);
    if (isNaN(number) || /^[+-]?\d{1,10}$/.test(input) === false) return false;
    return number >= -2147483646 && number <= 2147483647;
  }
  //float validation
  static isValidFloatNumber(input: string): boolean {
    const number = parseFloat(input);
    if (isNaN(number) || /^[+-]?\d+(\.\d+)?$/.test(input) === false) return false;
    return number >= 0 && number <= 2147483647;
  }

  //float validation with negative
  static isValidFloatNumber2(input: string): boolean {
    const number = parseFloat(input);
    if (isNaN(number) || /^[+-]?\d+(\.\d+)?$/.test(input) === false) return false;
    return number >= -2147483646 && number <= 2147483647;
  }

  //date validation
  static isValidDate(input: string): boolean {
    const date = Converters.toDate(input);
    if (date) return true;
    return false;
  }

  //percent validation
  static isValidPercent(input: string): boolean {
    if (CommonValidators.isValidIntegerNumber(input) === false) return false;
    const number = parseInt(input);
    if (number >= 0 && number <= 100) return true;
    return false;
  }

  //email validation
  static isValidEmail(input: string): boolean {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input);
  }

  //first day of month validation
  static isFirstDayOfMonth(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      return date.getDate() === 1;
    }
    return false;
  }

  //check if the date is today or in future
  static isInFutureOrToday(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }
    return false;
  }

  //check if the date is in future
  static isInFuture(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }
    return false;
  }

  //check if the date is in past
  static isInPast(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
    return false;
  }

  //check if the date is today
  static isToday(input: string): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.getTime() === today.getTime();
    }
    return false;
  }

  //check if the date is not older then the months number
  static isNotOlderThanXMonths(input: string, x: number): boolean {
    if (CommonValidators.isNullOrEmpty(input)) return false;
    const date = Converters.toDate(input);
    if (date) {
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setMonth(today.getMonth() - x);
      return date > today;
    }
    return false;
  }

  /* banking */
  static isValidSwiftCode(input: string): boolean {
    return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(input);
  }
  static phoneValidator(input: string): boolean {
    return /^\+?[\d\s()-]{5,}(?!.)/g.test(input);
  }
}
