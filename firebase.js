import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHSkRmSuHCGe1rGMZZWx2DHDO4c-3Gmuc",
  authDomain: "signal-clone-17026.firebaseapp.com",
  projectId: "signal-clone-17026",
  storageBucket: "signal-clone-17026.appspot.com",
  messagingSenderId: "514828518772",
  appId: "1:514828518772:web:96afa06c3a37588dbfd821",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { db, auth };
