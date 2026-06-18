# PostApp Mobile Application

This is the mobile application for PostApp, built with React Native and Expo using Expo Router.

## Features
- **Expo Router** for file-based navigation.
- **Tailwind CSS** (via `twrnc`) for styling.
- **Zustand** for state management.
- **Native Modules** and **Prebuild** workflows for custom native code integration.

## Setup

1. **Install Dependencies** (from the monorepo root):
   ```bash
   bun run install:all
   ```

2. **Environment Variables**:
   Create a `.env` file in the `apps/app` directory containing your API's local URL or production URL.
   ```env
   EXPO_PUBLIC_API=http://localhost:8002
   ```

## Running the App

You can run the app directly from this directory using Expo CLI commands, or use the root scripts (e.g. `bun run start:app`).

### Common Commands

* **Start the Metro Bundler**:
  ```bash
  bun run start
  ```
* **Run on Android Simulator/Device**:
  ```bash
  bun run android
  ```
* **Run on iOS Simulator/Device**:
  ```bash
  bun run ios
  ```

### Advanced Native Commands (Prebuilding)

If you modify native configurations, you may need to regenerate the `android` and `ios` folders. Here are some useful scripts:

* `yarn/bun add expo@latest` - install latest stable expo version
* `npx expo install --fix`  - install all latest compatible version with currently expo version
* `npx expo prebuild --clean` - make native changes from scratch
* `yarn/bun ios -d` - list out all available devices
* `yarn/bun android -d` - list out all available devices
* `npx expo prebuild --clean -p android` - make only android native changes from scratch
* `npx expo prebuild --clean -p ios` - make only ios native changes from scratch
