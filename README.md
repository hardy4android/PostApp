# PostApp Monorepo

Welcome to the PostApp Monorepo! This repository is organized as a monorepo using **Bun workspaces**. It contains two main projects:
1. **API (`apps/api`)**: A Node.js & Express backend utilizing Supabase.
2. **Mobile App (`apps/app`)**: A cross-platform mobile application built with React Native and Expo.

---

## Directory Structure

```text
PostAppMonoRepo/
├── package.json         # Root workspace configuration and scripts
├── bun.lock             # Monorepo lockfile
├── apps/
│   ├── api/             # Express Node.js Backend Server
│   └── app/             # React Native (Expo) Mobile Application
```

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v20 or higher recommended)
- **Bun** (`curl -fsSL https://bun.sh/install | bash`)
- **Android Studio / Xcode** (For running the mobile app natively)

---

## Setup & Installation

1. **Clone the repository** (if you haven't already) and navigate to the root folder:
   ```bash
   cd PostAppMonoRepo
   ```

2. **Install all dependencies** across the monorepo:
   ```bash
   bun run install:all
   ```
   *(This will automatically link dependencies for both `apps/api` and `apps/app` using Bun workspaces).*

3. **Configure Environment Variables**:
   - **For the API (`apps/api`)**: Create a `.env` file in the `apps/api` directory containing your Supabase credentials and other secrets (e.g., `PORT=8002`).
   - **For the App (`apps/app`)**: Create a `.env` file in the `apps/app` directory containing your API URL (e.g., `EXPO_PUBLIC_API=http://localhost:8002` or your local machine IP).

---

## Running the Project

You can run both the API and the mobile application directly from the **root directory** using the provided Bun scripts.

### 1. Start the Backend API
To spin up the Express/Supabase server:
```bash
bun run start:api
```
*By default, the server should run on `http://localhost:8002` (or whatever port is configured in your API).*

### 2. Start the Mobile App
You have a few options for running the mobile app. Open a **new terminal tab** and run one of the following commands from the root directory:

**Option A: Start the Expo Development Server (Metro)**
```bash
bun run start:app
```
*This opens the Expo CLI. You can then press `i` to open iOS, `a` for Android, or scan the QR code with Expo Go.*

**Option B: Build & Run on Android Emulator / Device**
```bash
bun run android:app
```

**Option C: Build & Run on iOS Simulator / Device (macOS only)**
```bash
bun run ios:app
```

---

## Useful Scripts Summary (Root `package.json`)

| Command | Description |
|---|---|
| `bun run install:all` | Installs dependencies for all workspaces. |
| `bun run start:api` | Starts the Express Node.js API. |
| `bun run start:app` | Starts the Expo Metro bundler for the mobile app. |
| `bun run android:app` | Builds and runs the mobile app natively on Android. |
| `bun run ios:app` | Builds and runs the mobile app natively on iOS. |

---

## Mobile App Local Commands (Inside `apps/app`)
If you prefer working inside the `apps/app` directory directly, here are a few common Expo commands:
- `bun run clean-android` - Cleans the Android build folder.
- `npx expo prebuild --clean` - Regenerates native Android and iOS folders from scratch.
- `bun run lint` - Runs Expo linter.

Happy coding!
