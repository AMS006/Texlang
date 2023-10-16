import { initializeApp , } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "texlang.firebaseapp.com",
  projectId: "texlang",
  storageBucket: "texlang.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  measurementId: "G-NXHSBLCVCY"
};
export const app = initializeApp(firebaseConfig);