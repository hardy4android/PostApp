import { ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

const withAndroidQueries: ConfigPlugin = expoConfig => {
  return withAndroidManifest(expoConfig, modConfig => {
    modConfig.modResults.manifest.queries = [
      {
        package: [
          {
            $: { 'android:name': 'com.postapp.ai' },
          },
        ],
        intent: [
          {
            action: [{ $: { 'android:name': 'android.intent.action.SENDTO' } }],
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
  });
};

export default withAndroidQueries;
