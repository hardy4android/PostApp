"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBluetoothPermissions = void 0;
var config_plugins_1 = require("@expo/config-plugins");
var BLUETOOTH_ALWAYS = 'Allow $(PRODUCT_NAME) to connect to bluetooth devices';
var withBluetoothPermissions = function (c, _a) {
    var bluetoothAlwaysPermission = _a.bluetoothAlwaysPermission;
    return (0, config_plugins_1.withInfoPlist)(c, function (config) {
        if (bluetoothAlwaysPermission !== false) {
            config.modResults.NSBluetoothAlwaysUsageDescription =
                bluetoothAlwaysPermission ||
                    config.modResults.NSBluetoothAlwaysUsageDescription ||
                    BLUETOOTH_ALWAYS;
        }
        return config;
    });
};
exports.withBluetoothPermissions = withBluetoothPermissions;
