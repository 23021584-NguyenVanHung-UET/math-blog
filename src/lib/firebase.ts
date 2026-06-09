import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxLv_7GHlwaNOFPecDU4A2u_2ep763kO0",
  authDomain: "mathblog-c94b7.firebaseapp.com",
  projectId: "mathblog-c94b7",
  storageBucket: "mathblog-c94b7.firebasestorage.app",
  messagingSenderId: "928372176238",
  appId: "1:928372176238:web:97facce3409b529cf4bd7f",
  measurementId: "G-R42NB4YXJE",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
