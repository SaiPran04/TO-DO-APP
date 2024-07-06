// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7UJqVy4YP7VyjLqLAO2TmCwliAWIT1V4",
  authDomain: "todo-list-c14ec.firebaseapp.com",
  projectId: "todo-list-c14ec",
  storageBucket: "todo-list-c14ec.appspot.com",
  messagingSenderId: "429577685750",
  appId: "1:429577685750:web:5abccf0331d133aebabad7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();