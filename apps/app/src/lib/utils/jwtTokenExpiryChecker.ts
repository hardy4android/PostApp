import CryptoJS from 'crypto-js';

export const jwtTokenExpiryChecker = (jwtToken: string) => {
  const jwtTokenParts = jwtToken.split('.');
  const payloadWordArray = CryptoJS.enc.Base64.parse(jwtTokenParts[1]);
  const payloadStringify = CryptoJS.enc.Utf8.stringify(payloadWordArray);
  const payload = JSON.parse(payloadStringify);

  const deviceCurrentDateLength = Date.now().toString().length;
  const actualCurrentDate =
    deviceCurrentDateLength > 10 ? Date.now() / 1000 : Date.now();

  return payload.exp && actualCurrentDate >= payload.exp;
};
