// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage  ,ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKSNiOciWowRb3mPXpQXTib2022CB1wCE",
  authDomain: "react-assesment-c24b0.firebaseapp.com",
  projectId: "react-assesment-c24b0",
  storageBucket: "react-assesment-c24b0.appspot.com",
  messagingSenderId: "403026215460",
  appId: "1:403026215460:web:577a64b481fd3ca14d0eb1",
  measurementId: "G-BQHT42C60Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)


