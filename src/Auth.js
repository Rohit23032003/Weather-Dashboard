// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBik-Ug6WL0HDpLOBbWzQOZNgr3aJJafQc",
  authDomain: "weather-dashboard-9af39.firebaseapp.com",
  projectId: "weather-dashboard-9af39",
  storageBucket: "weather-dashboard-9af39.appspot.com",
  messagingSenderId: "693319125938",
  appId: "1:693319125938:web:41d5e1dbd15bf3c21272ab",
  measurementId: "G-PXSPZTEY9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db };