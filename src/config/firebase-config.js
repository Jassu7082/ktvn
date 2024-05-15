// src/config/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import getStorage function
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import auth functions
import { getFirestore } from "firebase/firestore"; // Import getFirestore function

import { firebaseConfig } from "../constants";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase storage service
export const imageDb = getStorage(app);

// Export Firestore database
export const txtDB = getFirestore(app);

// Export auth and GoogleAuthProvider
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
