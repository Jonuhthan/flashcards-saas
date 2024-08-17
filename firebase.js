// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirebase } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3qM9Rxjkv6dhYRfAzLs4EkuxYtqzoW6I",
  authDomain: "flashcard-saas-5a8da.firebaseapp.com",
  projectId: "flashcard-saas-5a8da",
  storageBucket: "flashcard-saas-5a8da.appspot.com",
  messagingSenderId: "203688617961",
  appId: "1:203688617961:web:5c0e001a4415898cad0d78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirebase(app);

export {db};