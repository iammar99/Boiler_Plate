// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAK8-MbaH5FMpHOUOSlMjMyezQ8coNdao",
  authDomain: "final-project-1320.firebaseapp.com",
  projectId: "final-project-1320",
  storageBucket: "final-project-1320.appspot.com",
  messagingSenderId: "408638174146",
  appId: "1:408638174146:web:24e43dc2fb8e5c86eadc5b",
  measurementId: "G-2NSH0KDJWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app , analytics }