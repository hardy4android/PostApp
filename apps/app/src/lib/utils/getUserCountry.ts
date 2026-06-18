import * as Localization from "expo-localization";

export const getUserCountry = () => {
  const locales = Localization.getLocales(); // returns array

  if (!locales || locales.length === 0) return null;

  const country = locales[0].regionCode;
  console.log("User Country Code:", country);
//   console.log("Locales:", Localization.getLocales());
  return country?.toUpperCase() || null;
};
