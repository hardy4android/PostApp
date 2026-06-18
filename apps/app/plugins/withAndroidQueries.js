'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
let config_plugins_1 = require('expo/config-plugins');
let withAndroidQueries = function (expoConfig) {
  return (0, config_plugins_1.withAndroidManifest)(
    expoConfig,
    function (modConfig) {
      modConfig.modResults.manifest.queries = [
        {
          package: [
            {
              $: { 'android:name': 'com.postapp.ai' },
            },
          ],
          intent: [
            {
              action: [
                { $: { 'android:name': 'android.intent.action.SENDTO' } },
              ],
              data: [{ $: { 'android:scheme': 'mailto' } }],
            },
            {
              action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
              data: [{ $: { 'android:scheme': 'tel' } }],
            },
            {
              action: [{ $: { 'android:name': 'android.intent.action.DIAL' } }],
            },
          ],
        },
      ];
      return modConfig;
    },
  );
};
exports.default = withAndroidQueries;
