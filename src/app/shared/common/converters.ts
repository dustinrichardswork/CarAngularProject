export class Converters {
  public static toNumber(param: any): number {
    const number = parseInt(param, 10);
    if (isNaN(number)) return null;
    return number;
  }

  public static toBoolean(param: any): boolean {
    if (param === true) return true;
    if (param === false) return false;
    if (param === 'true') return true;
    if (param === 'false') return false;
    return false;
  }

  //yyyy-mm-dd
  public static toDate(param: any, utc = true): Date {
    if (param instanceof Date) return param;
    if (typeof param === 'string') {
      const parts = param.split('-');
      if (parts.length !== 3) return null;
      const day = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[0], 10);
      if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

      // hack not passing smaller year , ussauly when typeing into field
      if (year < 1900) return null;

      const date = utc
        ? new Date(Date.UTC(year, month - 1, day))
        : new Date(year, month - 1, day, 0, 0, 0, 0);

      return date;
    }
    return null;
  }

  //yyyy-mm-dd
  public static dateToString(param: Date, utc = true): string {
    if (!param) return null;
    if (utc) return param.getUTCFullYear() + '-' + param.getUTCMonth() + '-' + param.getUTCDate();
    else return param.getFullYear() + '-' + param.getMonth() + '-' + param.getDate();
  }
}
