import { nativeApplicationVersion } from 'expo-application';

export const compareAppVersions = (supportedMinimumVersion: string) => {
  const parts1 = nativeApplicationVersion?.split('.').map(Number) ?? [0, 0, 0];
  const parts2 = supportedMinimumVersion.split('.').map(Number);
  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 !== part2) {
      return part1 - part2; // If parts are not equal, return difference
    }
  }

  return 0; // If versions are equal
};
