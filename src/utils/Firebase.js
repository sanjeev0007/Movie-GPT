// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIQEDMcPCEvcAaSnY1n501e0WOnzfVW94",
  authDomain: "netflixgpt-188f9.firebaseapp.com",
  projectId: "netflixgpt-188f9",
  storageBucket: "netflixgpt-188f9.appspot.com",
  messagingSenderId: "573653949354",
  appId: "1:573653949354:web:86a42a3e6028e53f27a9d3",
  measurementId: "G-FZHRXQE9Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();