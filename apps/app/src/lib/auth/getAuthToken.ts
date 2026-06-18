import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_session_token";

export async function getAuthToken(forceRefresh = false): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
