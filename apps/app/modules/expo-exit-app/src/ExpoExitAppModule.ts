import { NativeModule, requireNativeModule } from 'expo';

import { ExpoExitAppModuleEvents } from './ExpoExitApp.types';

declare class ExpoExitAppModule extends NativeModule<ExpoExitAppModuleEvents> {
  exitApp(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoExitAppModule>('ExpoExitApp');
