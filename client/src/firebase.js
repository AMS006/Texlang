import { initializeApp , } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "texlang.firebaseapp.com",
  projectId: "texlang",
  storageBucket: "texlang.appspot.com",
  messagingSenderId: "260649366332",
  appId: "1:260649366332:web:5bb97e7990c069b4456439",
  measurementId: "G-NXHSBLCVCY"
};
export const app = initializeApp(firebaseConfig);