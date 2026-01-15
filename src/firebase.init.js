// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF1QhI-AaqzobAZLKOv4L1r6XXHS9PQdw",
  authDomain: "bigboss-cf921.firebaseapp.com",
  projectId: "bigboss-cf921",
  storageBucket: "bigboss-cf921.firebasestorage.app",
  messagingSenderId: "252501341003",
  appId: "1:252501341003:web:45764844670932fe602ece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
