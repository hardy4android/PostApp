#!/usr/bin/env zx

import fs from 'fs/promises';
import path from 'path';
import { $, argv } from 'zx';

// Get stage from command line arguments
const stage = argv.stage; // First two args are node and script path

if (!stage) {
  console.error(
    'Please provide a stage argument (development/staging/production)',
  );
  process.exit(1);
}

const validStages = ['development', 'staging', 'production'];
if (!validStages.includes(stage)) {
  console.error(`Invalid stage. Must be one of: ${validStages.join(', ')}`);
  process.exit(1);
}

try {
  // Copy the appropriate .env file
  const envSource = path.join(process.cwd(), `.env.${stage}`);
  const envDest = path.join(process.cwd(), '.env');

  await fs.copyFile(envSource, envDest);
  console.log(`Copied ${envSource} to .env`);

  // Change to android directory and run gradle commands

  const androidDir = path.join(process.cwd(), 'android');

  console.log('Running gradle clean...');
  await $({ cwd: androidDir, verbose: true })`./gradlew clean`;

  console.log('Building release APK...');
  await $({ cwd: androidDir })`./gradlew assembleRelease`;

  // Check if APK exists
  const apkPath = path.join(
    androidDir,
    'app/build/outputs/apk/release/app-release.apk',
  );

  try {
    await fs.access(apkPath);
    console.log('APK file created successfully');

    // Rename the APK file
    const newApkPath = path.join(path.dirname(apkPath), `app-${stage}.apk`);
    await fs.rename(apkPath, newApkPath);
    console.log(`Renamed APK to app-${stage}.apk`);

    // Create dist directory if it doesn't exist
    const distDir = path.join(process.cwd(), 'dist');
    await fs.mkdir(distDir, { recursive: true });

    // Copy renamed APK to dist folder
    const distPath = path.join(distDir, `app-${stage}.apk`);
    await fs.copyFile(newApkPath, distPath);
    console.log(`Copied APK to ${distPath}`);
  } catch (err) {
    console.error('APK file not found at expected location:', apkPath);
    throw err;
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
