# GENCOACH Setup Guide

## Environment Variables

Your `.env.local` file needs the following API keys:

### 1. Clerk Authentication
- **EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY**
  - Get from: https://dashboard.clerk.com
  - Navigate to: Your App → API Keys → Publishable key
  - Format: `pk_test_xxxxxxxxxx` (test) or `pk_live_xxxxxxxxxx` (production)

### 2. Convex Database
- **EXPO_PUBLIC_CONVEX_URL**
  - Get from: https://dashboard.convex.dev
  - Navigate to: Your Project → Settings → Deployment URL
  - Format: `https://xxxxxxxxxx.convex.cloud`

### 3. Firebase Configuration
- **EXPO_PUBLIC_FIREBASE_API_KEY**
- **EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN**
- **EXPO_PUBLIC_FIREBASE_PROJECT_ID**
- **EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET**
- **EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
- **EXPO_PUBLIC_FIREBASE_APP_ID**
  
  Get from: https://console.firebase.google.com
  - Navigate to: Project Settings → General → Your apps → Web app
  - Click "Add app" if you haven't created one yet
  - Copy the config values from the Firebase SDK snippet

## Setup Steps

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API keys to `.env.local`** (follow the format in .env.example)

3. **Install dependencies:**
   ```bash
   yarn install
   ```

4. **Run the app:**
   ```bash
   yarn start
   ```

## Vercel Deployment

Make sure to add all environment variables to your Vercel project:
- Go to: https://vercel.com/your-project/settings/environment-variables
- Add each variable from your `.env.local` file

## Notes
- Clerk is already configured in `providers/ClerkAndConvexProvider.tsx`
- Firebase is configured in `config/firebase.ts`
- Never commit `.env.local` to git (it's already in .gitignore)
