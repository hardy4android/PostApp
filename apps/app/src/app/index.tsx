import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/apis/services/authService";
import { setAuthToken } from "@/lib/auth/getAuthToken";
import tw from "@/lib/tailwind";

export default function AuthScreen() {
  const { setIsAuthenticated } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g. name@example.com)");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { ok, data: responseData } = isLogin
        ? await authService.login(email, password)
        : await authService.register(email, password);

      if (!ok || !responseData || responseData.success === false) {
        const errorMessage = responseData?.error || "Authentication failed. Please try again.";
        throw new Error(errorMessage);
      }

      if (responseData.success && responseData.data?.session?.access_token) {
        await setAuthToken(responseData.data.session.access_token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw.style("flex-1 bg-onboarding-bg")}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={tw.style("flex-grow justify-center p-6")} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw.style("bg-white rounded-3xl p-8 border border-onboarding-borderGray shadow-lg")}>
          <Text style={tw.style("text-4xl font-Inter-SemiBold text-onboarding-secondary text-center mb-2")}>
            PostApp
          </Text>
          <Text style={tw.style("text-[15px] font-Inter-Medium text-core-contentSecondary text-center mb-8")}>
            {isLogin ? "Welcome back! Log in to continue" : "Create an account to get started"}
          </Text>

          {/* Toggle Tabs */}
          <View style={tw.style("flex-row bg-onboarding-tabBg rounded-xl p-1 mb-6")}>
            <TouchableOpacity
              style={tw.style("flex-1 py-3 items-center rounded-lg", isLogin && "bg-onboarding-secondary")}
              onPress={() => {
                setIsLogin(true);
                setError(null);
              }}
              disabled={loading}
            >
              <Text style={tw.style("text-sm font-Inter-SemiBold", isLogin ? "text-white" : "text-core-labelGray")}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style("flex-1 py-3 items-center rounded-lg", !isLogin && "bg-onboarding-secondary")}
              onPress={() => {
                setIsLogin(false);
                setError(null);
              }}
              disabled={loading}
            >
              <Text style={tw.style("text-sm font-Inter-SemiBold", !isLogin ? "text-white" : "text-core-labelGray")}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && (
            <View style={tw.style("bg-onboarding-errorBg border border-onboarding-errorBorder rounded-xl p-4 mb-5")}>
              <Text style={tw.style("text-onboarding-errorText text-sm font-Inter-Medium text-center")}>
                {error}
              </Text>
            </View>
          )}

          {/* Input Fields */}
          <View style={tw.style("w-full")}>
            <Text style={tw.style("text-sm font-Inter-SemiBold text-core-contentPrimary mb-2")}>
              Email Address
            </Text>
            <TextInput
              style={tw.style("bg-white text-core-contentPrimary border border-onboarding-inputBorder rounded-xl px-4 py-3.5 text-base mb-5")}
              placeholder="name@example.com"
              placeholderTextColor={tw.color("onboarding-placeholder")}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <Text style={tw.style("text-sm font-Inter-SemiBold text-core-contentPrimary mb-2")}>
              Password
            </Text>
            <View style={tw.style("relative mb-5")}>
              <TextInput
                style={tw.style("w-full bg-white text-core-contentPrimary border border-onboarding-inputBorder rounded-xl pl-4 pr-12 py-3.5 text-base")}
                placeholder="••••••••"
                placeholderTextColor={tw.color("onboarding-placeholder")}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={tw.style("absolute right-4 top-4")}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={tw.color("core-labelGray")} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </Svg>
                ) : (
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={tw.color("core-labelGray")} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <Line x1="1" y1="1" x2="23" y2="23" />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            {isLogin ? (
              <View style={tw.style("h-[88px]")} />
            ) : (
              <>
                <Text style={tw.style("text-sm font-Inter-SemiBold text-core-contentPrimary mb-2")}>
                  Confirm Password
                </Text>
                <View style={tw.style("relative mb-5")}>
                  <TextInput
                    style={tw.style("w-full bg-white text-core-contentPrimary border border-onboarding-inputBorder rounded-xl pl-4 pr-12 py-3.5 text-base")}
                    placeholder="••••••••"
                    placeholderTextColor={tw.color("onboarding-placeholder")}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={tw.style("absolute right-4 top-4")}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    activeOpacity={0.7}
                  >
                    {showConfirmPassword ? (
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={tw.color("core-labelGray")} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </Svg>
                    ) : (
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={tw.color("core-labelGray")} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <Line x1="1" y1="1" x2="23" y2="23" />
                      </Svg>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={tw.style("bg-onboarding-secondary rounded-xl py-4 items-center mt-3")}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={tw.color("white")} />
              ) : (
                <Text style={tw.style("text-white text-base font-Inter-Bold")}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
