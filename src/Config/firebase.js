// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7gc77FLIVzVkNaz8BgIfUKGFk4x61DLk",
  authDomain: "arena-hub-baffa.firebaseapp.com",
  projectId: "arena-hub-baffa",
  storageBucket: "arena-hub-baffa.firebasestorage.app",
  messagingSenderId: "635333872545",
  appId: "1:635333872545:web:f35adbdc61e780aa0719e0",
  measurementId: "G-CPB7WPTQXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);


export { app, analytics ,auth , firestore };