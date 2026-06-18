import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import tw from "@/lib/tailwind";
import loaderAnimation from "@assets/lottie/loader.json";

interface FullScreenLoaderProps {
  visible: boolean;
}

export default function FullScreenLoader({ visible }: FullScreenLoaderProps) {
  if (!visible) return null;

  return (
    <View
      style={tw.style(
        "absolute inset-0 bg-black/40 justify-center items-center z-[9999]",
      )}
    >
      <View
        style={tw.style(
          "bg-core-primaryLight p-4 rounded-3xl shadow-2xl border border-white/20 justify-center items-center",
        )}
      >
        <LottieView
          source={loaderAnimation}
          autoPlay
          loop
          style={{ width: 80, height: 80 }}
        />
      </View>
    </View>
  );
}
