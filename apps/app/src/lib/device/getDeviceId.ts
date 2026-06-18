import * as Application from "expo-application";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const DEVICE_ID_KEY = "APP_DEVICE_ID";

export const getDeviceId = async (): Promise<string> => {
  // 1. Return cached device ID if available (fastest path)
  const stored = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (stored) return stored;

  // 2. Get a platform-specific identifier that survives reinstalls & cache clears
  //    - Android: androidId is unique per device + app signing key, persists across reinstalls
  //    - iOS: IDFV is unique per device + vendor, persists while any vendor app is installed
  //           (SecureStore/Keychain also persists across reinstalls on iOS)
  let rawId: string | null = null;

  if (Platform.OS === "android") {
    rawId = Application.getAndroidId();
  } else if (Platform.OS === "ios") {
    rawId = await Application.getIosIdForVendorAsync();
  }

  // 3. Fallback to UUID only if platform API fails (should never happen on real devices)
  if (!rawId) {
    rawId = Crypto.randomUUID();
  }

  // 4. Hash to normalize format and avoid leaking raw platform IDs
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    rawId
  );
  const deviceId = hash.slice(0, 32);

  await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
  return deviceId;
};
