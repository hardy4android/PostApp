import { Platform } from "react-native";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  fontFamily: {
    "Lora-Medium": [
      Platform.select({
        android: "Lora_500Medium",
        ios: "Lora-Medium",
      }),
    ],
    "Lora-Semibold": [
      Platform.select({
        android: "Lora_600SemiBold",
        ios: "Lora-SemiBold",
      }),
    ],
    "Poppins-Regular": [
      Platform.select({
        android: "Poppins_400Regular",
        ios: "Poppins-Regular",
      }),
    ],
    "Poppins-Medium": [
      Platform.select({
        android: "Poppins_500Medium",
        ios: "Poppin  s-Medium",
      }),
    ],
    "Poppins-SemiBold": [
      Platform.select({
        android: "Poppins_600SemiBold",
        ios: "Poppins-SemiBold",
      }),
    ],
    "Inter-Regular": [
      Platform.select({
        android: "Inter_400Regular",
        ios: "Inter-Regular",
      }),
    ],
    "Inter-Medium": [
      Platform.select({
        android: "Inter_500Medium",
        ios: "Inter-Medium",
      }),
    ],
    "Inter-SemiBold": [
      Platform.select({
        android: "Inter_600SemiBold",
        ios: "Inter-SemiBold",
      }),
    ],
    "Inter-Bold": [
      Platform.select({
        android: "Inter_700Bold",
        ios: "Inter-Bold",
      }),
    ],
    "Courgette-Regular": [
      Platform.select({
        android: "Courgette_400Regular",
        ios: "Courgette-Regular",
      }),
    ],
  },
  container: {
    padding: {
      DEFAULT: "1.5rem",
    },
  },
  colors: {
    core: {
      contentPrimary: "#1C1C1C",
      contentTertiary: "#979797",
      contentInverseTertiary: "#979797",
      contentSecondary: "#555555",
      backgroundSecondary: "#ECECEC",
      contentInversePrimary: "#FFFFFF",
      borderOpaque: "#979797",
      backgroundTertiary: "#FFFDEC",
      backgroundPrimary: "#FFFFFF",
      red: "#DF2229",
      yellow: "#FFE143",
      coreYellow: "#FFCD00",
      primary: "#6F56E6",
      primaryLight: "#F6F4FD",
      textColor: "#251813",
      inactiveRed: "#DF22291A",
      inactiveBlue: "#1A1B4E1A",
      darkBlue: "#1A1B4E",
      labelGray: "#757575",
      gray: "#C7C7C7",
    },
    coreExtension: {
      backgroundAccent: "#3380FE",
      backgroundInversePrimary: "#1C1C1C",
      backgroundStateDisabled: "#ECECEC",
      contentInverseTertiary: "#ECECEC",
      backgroundPrimary: "#FFFFFF",
      borderNegative: "#F2AEB3",
      borderAccentLight: "#A5C6FC",
      backgroundLightNegative: "#FCF1F1",
      backgroundLightPositive: "#EEFBF5",
      borderWarning: "#FBD8AF",
      backgroundPositive: "#23D789",
      borderAccent: "#3380FE",
      backgroundNegative: "#E02129",
    },
    white: "#FFFFFF",
    gray: {
      100: "#EEEEEE",
      200: "#E3E3E3",
      300: "#E8E8E8",
      350: "#DDDDDD",
      400: "#7C7C7C",
      500: "#5E5E5E",
      600: "#545454",
    },
    black: "#000000",
    primitive: {
      blue: {
        400: "#3380FE",
      },
      orange: {
        400: "#FF8552",
        500: "#FF7A18",
        300: "#FFB347",
      },
      yellow: {
        400: "#FBAA4A",
      },
      green: {
        400: "#00AA77",
      },
      platinum: {
        600: "#556268",
      },
    },
    foundation: {
      positive: "#23D789",
      negative: "#E84855",
      primaryB: "#FFFFFF",
    },
    labels: {
      primary: "#000000",
    },
    colors: {
      green: "#34C759",
    },
    onboarding: {
      bg: "#F4F1FF",
      primary: "#7B61FF",
      secondary: "#5B3ADE",
      pink: "#FF76AF",
      pinkAccent: "#FF8AAE",
      pinkLight: "#FFE8EF",
      purpleLight: "#E9E5FF",
      textLight: "#9B8EC4",
      cardBg: "#EFEAFF",
      borderMuted: "#5B3ADE0B", // adjusted from 0A to 0B for clarity if needed, but 0A is fine
      borderLight: "#D6D6E5",
      borderGray: "#E5E5E5",
      tabBg: "#F1F0F5",
      errorBg: "#FFF1F2",
      errorBorder: "#F43F5E",
      errorText: "#E11D48",
      inputBorder: "#E2E8F0",
      placeholder: "#94A3B8",
    },
  },
};
export const plugins = [
  plugin(({ addUtilities }) => {
    addUtilities({
      ".paragraph-p2":
        "text-base font-Poppins-Regular text-core-contentSecondary",
      ".paragraph-p3":
        "font-Poppins-Regular text-core-contentSecondary text-sm",
      ".paragraph-p4":
        "font-Poppins-Regular text-xs text-primitive-platinum-600",
      // ─── Inter Paragraphs (same naming convention) ───────
      ".paragraph-p2-inter":
        "text-base font-Inter-Regular text-core-contentSecondary",
      ".paragraph-p3-inter":
        "text-sm font-Inter-Regular text-core-contentSecondary",
      ".paragraph-p4-inter":
        "text-xs font-Inter-Regular text-primitive-platinum-600",

      ".label-l1": "font-Poppins-Medium text-lg text-core-contentPrimary",
      ".label-l2": "text-base font-Poppins-Medium text-core-contentPrimary",
      ".label-l3": "font-Poppins-Regular text-core-contentSecondary text-sm",
      ".label-l4": "font-Poppins-Medium text-core-contentPrimary text-xs",
      // ─── Inter Labels ────────────────────────────────────
      ".label-l1-inter": "text-lg font-Inter-Medium text-core-contentPrimary",
      ".label-l2-inter": "text-base font-Inter-Medium text-core-contentPrimary",
      ".label-l3-inter":
        "text-sm font-Inter-Regular text-core-contentSecondary",
      ".label-l4-inter": "text-xs font-Inter-Medium text-core-contentPrimary",

      ".input-label-inter":
        "font-Inter-Regular text-[14px] text-core-contentPrimary",

      ".heading-h1":
        "text-[2rem] leading-9 android:leading-[42px] font-Lora-Semibold text-core-contentPrimary",
      ".heading-h2":
        "text-4xl leading-[46px] font-Lora-Medium text-core-contentPrimary",
      ".heading-h3":
        "text-[32px] leading-[40px] font-Lora-Semibold text-core-contentPrimary",
      ".heading-h4": "font-Poppins-Medium text-3xl",
      ".heading-h5": "font-Poppins-Medium text-2xl text-black",
      ".heading-h6": "font-Poppins-SemiBold text-xl text-core-contentPrimary",
      // ─── Inter Headings ──────────────────────────────────
      ".heading-h1-inter":
        "text-[2rem] leading-9 android:leading-[42px] font-Inter-SemiBold text-core-contentPrimary",
      ".heading-h2-inter":
        "text-4xl leading-[46px] font-Inter-Medium text-core-contentPrimary",
      ".heading-h3-inter":
        "text-[32px] leading-[40px] font-Inter-SemiBold text-core-contentPrimary",
      ".heading-h4-inter":
        "text-3xl font-Inter-Medium text-core-contentPrimary",
      ".heading-h5-inter": "text-2xl font-Inter-Medium text-black",
      ".heading-h6-inter":
        "text-[18px] font-Inter-SemiBold text-core-contentPrimary",
    });
  }),
];
