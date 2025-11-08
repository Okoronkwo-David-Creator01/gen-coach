# Authentication Flow Setup

## Overview
The app now supports complete user registration and sign-in flow with data saved to:
1. **Clerk** - Authentication (primary)
2. **Firebase Firestore** - User profile data
3. **Convex** - User data (optional, requires setup)

## Registration Flow

1. User fills out registration form (Full Name, Email, Password)
2. Account is created in Clerk
3. User profile is saved to Firebase Firestore
4. User profile is saved to Convex (if configured)
5. User is automatically redirected to Sign In page

## Sign In Flow

1. User enters email and password
2. Credentials are verified with Clerk
3. Upon successful authentication, user is redirected to main app (/(tabs))

## Main Page Features

The main page (`app/(tabs)/index.tsx`) includes:
- Header with hamburger menu and "GEN COACH" title
- Welcome message with user's name
- Total Courses counter
- AI Voice Chat section
- Empty state with "Create New Course" button
- Explore sidebar menu with: Doc, Language, Blog, Upgrade, Settings

## Convex Setup (Optional)

To enable Convex integration:

1. Run Convex development server:
   ```bash
   npx convex dev
   ```

2. This will:
   - Generate API types in `convex/_generated/api.d.ts`
   - Enable the `createUser` mutation in `convex/users.ts`
   - Set up the users table schema

3. The registration flow will automatically start saving to Convex once it's running.

## Current Status

✅ Clerk authentication - Working
✅ Firebase Firestore - Working
⚠️ Convex - Requires running `npx convex dev` to enable

The app works fully with just Clerk and Firebase. Convex is optional and won't block registration if not set up.

