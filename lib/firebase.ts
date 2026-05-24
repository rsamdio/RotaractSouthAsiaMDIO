import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2fCU7kFtpu1sipKDBlIfa9WrWf7Jsocw",
  authDomain: "rsacomingsoon2627.firebaseapp.com",
  databaseURL: "https://rsacomingsoon2627-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rsacomingsoon2627",
  storageBucket: "rsacomingsoon2627.firebasestorage.app",
  messagingSenderId: "462437998846",
  appId: "1:462437998846:web:a7556337b2f1b98ee9c5af",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
