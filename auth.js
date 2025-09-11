
import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Signup
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Welcome bestie 🎀 you’re signed up!");
      window.location = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome back bestie 💕");
      window.location = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      logoutBtn.style.display = "inline-block";
    } else {
      logoutBtn.style.display = "none";
    }
  });

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("You’ve been logged out 💖");
    window.location = "index.html";
  });
}
