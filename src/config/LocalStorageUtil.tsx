// utils/LocalStorageUtil.tsx
import EncryptionUtil from './EncryptionUtil';

class LocalStorageUtil {
  static saveToLocalStorage(key: string, data: any): void {
    try {
      const stringData = JSON.stringify(data);
      const encryptedData = EncryptionUtil.encryptData(stringData);
      localStorage.setItem(key, encryptedData);
    } catch (error) {
    }
  }

  static getFromLocalStorage(key: string): any {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      try {
        const decryptedData = EncryptionUtil.decryptData(encryptedData);
        const parsedData = JSON.parse(decryptedData);
        return parsedData;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

export default LocalStorageUtil;
