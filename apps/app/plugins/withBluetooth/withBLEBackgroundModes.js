"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBLEBackgroundModes = exports.BackgroundMode = void 0;
var config_plugins_1 = require("@expo/config-plugins");
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode["Central"] = "central";
    BackgroundMode["Peripheral"] = "peripheral";
})(BackgroundMode || (exports.BackgroundMode = BackgroundMode = {}));
function ensureKey(arr, key) {
    if (!arr.find(function (mode) { return mode === key; })) {
        arr.push(key);
    }
    return arr;
}
var centralKey = 'bluetooth-central';
var peripheralKey = 'bluetooth-peripheral';
/**
 * Append `UIBackgroundModes` to the `Info.plist`.
 */
var withBLEBackgroundModes = function (c, modes) {
    return (0, config_plugins_1.withInfoPlist)(c, function (config) {
        if (!Array.isArray(config.modResults.UIBackgroundModes)) {
            config.modResults.UIBackgroundModes = [];
        }
        if (modes.includes(BackgroundMode.Central)) {
            config.modResults.UIBackgroundModes = ensureKey(config.modResults.UIBackgroundModes, centralKey);
        }
        if (modes.includes(BackgroundMode.Peripheral)) {
            config.modResults.UIBackgroundModes = ensureKey(config.modResults.UIBackgroundModes, peripheralKey);
        }
        // Prevent empty array
        if (!config.modResults.UIBackgroundModes.length) {
            delete config.modResults.UIBackgroundModes;
        }
        return config;
    });
};
exports.withBLEBackgroundModes = withBLEBackgroundModes;
