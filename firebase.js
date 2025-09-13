// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);
