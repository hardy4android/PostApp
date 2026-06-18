import { ConfigPlugin, withProjectBuildGradle } from 'expo/config-plugins';

const withMavenLocal: ConfigPlugin = expoConfig => {
  return withProjectBuildGradle(expoConfig, modConfig => {
    if (modConfig.modResults.language === 'groovy') {
      modConfig.modResults.contents = modConfig.modResults.contents.replace(
        /(allprojects \{[^}]*repositories \{)/,
        '$1\n        mavenLocal()\n',
      );
    }
    return modConfig;
  });
};

export default withMavenLocal;
