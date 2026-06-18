import CryptoJS from 'crypto-js';

export const encodeToBase64 = (text: string) => {
  const encodedWord = CryptoJS.enc.Utf8.parse(text);
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
  return encoded;
};
