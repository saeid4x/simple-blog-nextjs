// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "lamablog-cb888.firebaseapp.com",
  projectId: "lamablog-cb888",
  storageBucket: "lamablog-cb888.appspot.com",
  messagingSenderId: "106956984422",
  appId: "1:106956984422:web:7021bd35d08301a6959da7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
