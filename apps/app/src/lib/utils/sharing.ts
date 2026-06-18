import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import Constants from "expo-constants";
import Share from "react-native-share";
import analytics from "@react-native-firebase/analytics";

/**
 * Shares an image with an attached application link.
 * 
 * @param imageUrl The remote URL of the image to share.
 * @param trackingEventBase Optional base name for analytics events.
 */
export const shareImageWithLink = async (
  imageUrl: string,
  trackingEventBase?: string
) => {
  if (!imageUrl) return;

  if (trackingEventBase) {
    try {
      analytics().logEvent(`${trackingEventBase}_share_tap`.substring(0, 40));
    } catch (e) {}
  }

  try {
    // 1. Generate local path in cache
    const fileUri =
      FileSystem.cacheDirectory + `share-ai-image-${Date.now()}.jpg`;

    // 2. Download the image locally to share the actual file
    const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

    const packageName =
      Constants.expoConfig?.android?.package || "com.postapp.ai";
    const appLink =
      Platform.OS === "android"
        ? `https://play.google.com/store/apps/details?id=${packageName}`
        : `https://apps.apple.com/app/idYOUR_APPLE_ID`; // TODO: Replace with actual Apple ID

    // 3. Share the local file URI + Message using react-native-share
    await Share.open({
      url: uri,
      message: `Check out this amazing image I generated with postapp - AI! 🎨✨\n\nGet the app: ${appLink}`,
      type: "image/jpeg",
      title: "Share AI Image",
    });
  } catch (error) {
    console.log("Error sharing image:", error);
  }
};
