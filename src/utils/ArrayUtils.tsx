export class ArrayUtils {
  static isSubsetOf(arr: string[], arr2: string[]) {
    return arr2.every(val => arr.includes(val));
  }
}