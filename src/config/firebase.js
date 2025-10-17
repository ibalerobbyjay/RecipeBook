import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDYFqxJranObmlq7yaiAGZ1-dfmzFCSN2U",
  authDomain: "recipebook-4d747.firebaseapp.com",
  projectId: "recipebook-4d747",
  storageBucket: "recipebook-4d747.firebasestorage.app",
  messagingSenderId: "963097808049",
  appId: "1:963097808049:web:4e0f3b8d3cd863370ce690",
  measurementId: "G-X52MF5TQ7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
