import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgtHqOUECyWjONqTAX_tBZ0utxxt48mTI",
  authDomain: "orbigreen-94ea5.firebaseapp.com",
  projectId: "orbigreen-94ea5",
  storageBucket: "orbigreen-94ea5.firebasestorage.app",
  messagingSenderId: "642346536573",
  appId: "1:642346536573:web:6b5890ed61026c10dd2b14",
  measurementId: "G-TRKYC6WE1J",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
