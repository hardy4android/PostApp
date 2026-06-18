/**
 * Analytics utility — Firebase v22 modular API wrapper.
 *
 * All files should import `logAnalyticsEvent` from here instead of calling
 * `analytics().logEvent()` directly (which is the deprecated namespaced API).
 *
 * Usage:
 *   import { logAnalyticsEvent } from "@/lib/analytics";
 *   logAnalyticsEvent("home_view");
 *   logAnalyticsEvent("button_tap", { screen: "home" });
 */

import { getAnalytics, logEvent } from "@react-native-firebase/analytics";

/**
 * Log a Firebase Analytics custom event.
 * @param eventName  Must be ≤ 40 chars, alphanumeric + underscores only.
 * @param params     Optional key-value params (strings / numbers / booleans).
 */
export async function logAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  try {
    const analyticsInstance = getAnalytics();
    await logEvent(analyticsInstance, eventName, params);
  } catch (_e) {
    // Silently ignore analytics errors so they never crash the app
  }
}
