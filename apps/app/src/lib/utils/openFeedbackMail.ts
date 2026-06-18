import { Linking, Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";

/**
 * Opens the default mail client with a pre-filled feedback template.
 * Includes technical details like app version, OS, model, and user ID.
 */
export const openFeedbackMail = async (userId: string = "Not Logged In", productId?: string) => {
  const to = "feedback@hnvtechnolabs.com";
  const subject = "postapp - Ai Feedback";
  const appVersion = Constants.expoConfig?.version || "1.0.0";
  const osVersion = `${Device.osName} ${Device.osVersion}`;
  const model = Device.modelName || "Unknown Device";
  const onlyModelName = model.split(" ").slice(0, 2).join(" ");
  const productName = "postapp - Ai";

  const body = `
  
--------------------------------------------------
Please do not remove this portion because this will help to identify technical issues.

Product Name : ${productName}
app_version : ${appVersion}
os_version : ${osVersion}
model : ${onlyModelName}
token_id : ${userId}
${productId ? `product_id : ${productId}\n` : ""}`.trim();

  const mailUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    const canOpen = await Linking.canOpenURL(mailUrl);
    if (canOpen) {
      await Linking.openURL(mailUrl);
    } else {
      console.error("Cannot open mail client");
    }
  } catch (error) {
    console.error("Error opening mail client:", error);
  }
};
