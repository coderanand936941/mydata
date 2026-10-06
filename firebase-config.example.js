// Copy this file to assets/js/firebase-config.js and add your Firebase Web App config.
// Do NOT put service-account private keys here.
// Firebase client configuration is not a secret, but Firestore/Storage Security Rules ARE essential.

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Optional: use emulators during local development if desired.