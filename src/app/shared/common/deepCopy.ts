export function deepCopy(obj) {
    if (obj == undefined)
      return obj;
    return JSON.parse(JSON.stringify(obj));
  }
  