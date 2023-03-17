// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDsVy3gAX81OxGzqBYPnHCf4oHjWb6JOj8",
  authDomain: "ebeuk-237.firebaseapp.com",
  projectId: "ebeuk-237",
  storageBucket: "ebeuk-237.appspot.com",
  messagingSenderId: "768559250794",
  appId: "1:768559250794:web:5006cb49446404a7f9b913",
  measurementId: "G-J0M1JVVR7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);