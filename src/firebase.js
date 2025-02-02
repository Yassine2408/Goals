import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB5crBzkAYde66v7dFK39MP5lC1U_NaVy4",
  authDomain: "goals-d7fbc.firebaseapp.com",
  projectId: "goals-d7fbc",
  storageBucket: "goals-d7fbc.firebasestorage.app",
  messagingSenderId: "1039132747654",
  appId: "1:1039132747654:web:850b452499ee483e0fae07",
  measurementId: "G-HQQPBCBHG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
