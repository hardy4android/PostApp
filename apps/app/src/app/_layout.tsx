import { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { getAuthToken } from "@/lib/auth/getAuthToken";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await getAuthToken();
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to load token", e);
      } finally {
        setIsReady(true);
      }
    }
    checkAuth();
  }, [setIsAuthenticated]);

  useEffect(() => {
    if (!isReady) return;
    if (isAuthenticated) {
      router.replace("/posts" as any);
    } else {
      router.replace("/" as any);
    }
  }, [isAuthenticated, isReady]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0F14" }}>
        <ActivityIndicator size="large" color="#EAB308" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0D0F14" } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="posts" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
