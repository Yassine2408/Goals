import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "goals-d7fbc.firebaseapp.com",
  projectId: "goals-d7fbc",
  storageBucket: "goals-d7fbc.firebasestorage.app",
  messagingSenderId: "1039132747654",
  appId: "1:1039132747654:web:850b452499ee483e0fae07",
  measurementId: "G-HQQPBCBHG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);