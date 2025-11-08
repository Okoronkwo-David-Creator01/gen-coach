import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export type UserProfile = {
  email: string
  fullName: string
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  // Skip Firebase save if not configured
  if (!db) {
    console.log('Firebase not configured - skipping user profile save');
    return;
  }

  try {
    const userId = profile.email.toLowerCase()
    await setDoc(
      doc(db, 'users', userId),
      {
        email: profile.email,
        fullName: profile.fullName,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
    console.log('User profile saved to Firebase:', profile.email);
  } catch (error) {
    console.error('Failed to save user profile to Firebase:', error);
    // Don't throw - allow registration to continue even if Firebase fails
  }
}


