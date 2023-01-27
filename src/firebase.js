// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfT-y1BhlQ3CTlTfTgkGtMez1TpEqCBlM",
  authDomain: "theriac-f2f81.firebaseapp.com",
  projectId: "theriac-f2f81",
  storageBucket: "theriac-f2f81.appspot.com",
  messagingSenderId: "241719911571",
  appId: "1:241719911571:web:224c938253f2e61fd21966",
  measurementId: "G-XBDV2N7Y30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app;
