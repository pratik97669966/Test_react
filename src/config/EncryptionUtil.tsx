// utils/EncryptionUtil.tsx
import CryptoJS from 'crypto-js';

// Load the secret key from environment variables
const SECRET_KEY = "data=" + process.env.REACT_APP_SECRET_KEY;

class EncryptionUtil {
  static encryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encrypted;
  }

  static decryptData(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}

export default EncryptionUtil;
