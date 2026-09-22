# MAUSAM — Frontend

Personalized weather-app homepage. React Native + Expo (TypeScript) client for MAUSAM, a disaster-management-themed weather app that adapts its homepage to 8 user personas.

## Tech Stack
- **Framework:** React Native + Expo (TypeScript)
- **i18n:** i18next (English / Tamil / Hindi)
- **Push Notifications:** Firebase Cloud Messaging
- **Backend:** FastAPI (see `../backend/README.md`)

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- [Expo Go](https://expo.dev/go) app installed on your phone (iOS/Android)
- Your phone and laptop must be on the **same wifi network** to test against the local backend

## Setup

Install dependencies:

```bash
npm install
```

## Running the App

1. Make sure the backend is running first — see `../backend/README.md`.
2. Update `config.ts` with your laptop's current local IP address (see "Backend Connection" below).
3. Start the Expo dev server:

```bash
npx expo start
```

4. Open the **Expo Go** app on your phone and scan the QR code shown in the terminal.

## Backend Connection

The app fetches live data from the FastAPI backend, defined in `config.ts`:

```typescript
export const API_BASE_URL = "http://YOUR-LOCAL-IP:8000";
```

**Important:** `YOUR-LOCAL-IP` is your laptop's IP address on your current wifi network — it changes if you switch networks. To find it:

```bash
ipconfig
```

Look for **IPv4 Address** under your active wifi adapter, and update `config.ts` accordingly. Do NOT use `localhost` — it won't work from a physical phone, since `localhost` on the phone refers to the phone itself, not your laptop.

## Project Structure