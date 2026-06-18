"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("expo/config-plugins");
var withMavenLocal = function (expoConfig) {
    return (0, config_plugins_1.withProjectBuildGradle)(expoConfig, function (modConfig) {
        if (modConfig.modResults.language === 'groovy') {
            modConfig.modResults.contents = modConfig.modResults.contents.replace(/(allprojects \{[^}]*repositories \{)/, '$1\n        mavenLocal()\n');
        }
        return modConfig;
    });
};
exports.default = withMavenLocal;
