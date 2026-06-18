import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoExitAppViewProps } from './ExpoExitApp.types';

const NativeView: React.ComponentType<ExpoExitAppViewProps> =
  requireNativeView('ExpoExitApp');

export default function ExpoExitAppView(props: ExpoExitAppViewProps) {
  return <NativeView {...props} />;
}
