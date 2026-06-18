"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundMode = void 0;
var config_plugins_1 = require("@expo/config-plugins");
var withBLEAndroidManifest_1 = require("./withBLEAndroidManifest");
var withBLEBackgroundModes_1 = require("./withBLEBackgroundModes");
Object.defineProperty(exports, "BackgroundMode", { enumerable: true, get: function () { return withBLEBackgroundModes_1.BackgroundMode; } });
var withBluetoothPermissions_1 = require("./withBluetoothPermissions");
var pkg = { name: 'smartlock-module', version: '1.0.0' }; // require('react-native-ble-plx/package.json')
/**
 * Apply BLE native configuration.
 */
var withBLE = function (config, props) {
    var _a, _b;
    if (props === void 0) { props = {}; }
    var _props = props || {};
    var isBackgroundEnabled = (_a = _props.isBackgroundEnabled) !== null && _a !== void 0 ? _a : false;
    var neverForLocation = (_b = _props.neverForLocation) !== null && _b !== void 0 ? _b : false;
    if ('bluetoothPeripheralPermission' in _props) {
        config_plugins_1.WarningAggregator.addWarningIOS('bluetoothPeripheralPermission', "The iOS permission `NSBluetoothPeripheralUsageDescription` is fully deprecated as of iOS 13 (lowest iOS version in Expo SDK 47+). Remove the `bluetoothPeripheralPermission` property from the `@config-plugins/react-native-ble-plx` config plugin.");
    }
    // iOS
    config = (0, withBluetoothPermissions_1.withBluetoothPermissions)(config, _props);
    config = (0, withBLEBackgroundModes_1.withBLEBackgroundModes)(config, _props.modes || []);
    // Android
    config = config_plugins_1.AndroidConfig.Permissions.withPermissions(config, [
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN',
        'android.permission.BLUETOOTH_CONNECT', // since Android SDK 31
    ]);
    config = (0, withBLEAndroidManifest_1.withBLEAndroidManifest)(config, {
        isBackgroundEnabled: isBackgroundEnabled,
        neverForLocation: neverForLocation,
    });
    return config;
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withBLE, pkg.name, pkg.version);
