// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGNLgmA7NW3RxCB1ra2QUiVaakFMOGfjk",
  authDomain: "perenkgirisimci.firebaseapp.com",
  projectId: "perenkgirisimci",
  storageBucket: "perenkgirisimci.appspot.com",
  messagingSenderId: "484991133602",
  appId: "1:484991133602:web:f8e9fa46d32390dc83f4fb",
  measurementId: "G-LVB5QVWFY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and EXPORT Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);