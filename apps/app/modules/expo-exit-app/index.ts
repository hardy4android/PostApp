// Import the native module. On web, it will be resolved to ExpoExitAppModule.web.ts
// and on native platforms to ExpoExitAppModule.ts

import ExpoExitAppModule from './src/ExpoExitAppModule';

export function exitApp() {
  return ExpoExitAppModule.exitApp();
}
