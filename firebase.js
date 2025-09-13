// firebase.js - initialize Firebase (web)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Replace these values with your project's config if you want to override
const firebaseConfig = {
  apiKey: "AIzaSyDTQyo3zP3lw_Amgghun_rfT-77xlskpB4",
  authDomain: "the-pirouette-pack.firebaseapp.com",
  projectId: "the-pirouette-pack",
  storageBucket: "the-pirouette-pack.appspot.com",
  messagingSenderId: "779287102094",
  appId: "1:779287102094:web:a4529b2ec4015d7f5ebfdf",
  measurementId: "G-WBCEPJ5E8F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
