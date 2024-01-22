import { logout } from "./modules/logout.js";

const logoutBtn = document.querySelector("#logOutButton").addEventListener("click", logout);
const displayName = document.querySelector("#usernameDisplay");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzTVnnpG4-KdDMJ6wZQvsvf3k1tPHK8h8",
    authDomain: "slutprojekt-versionhantering.firebaseapp.com",
    databaseURL: "https://slutprojekt-versionhantering-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "slutprojekt-versionhantering",
    storageBucket: "slutprojekt-versionhantering.appspot.com",
    messagingSenderId: "449173684587",
    appId: "1:449173684587:web:c5a004cb69a21599a3cc2e"
};

const app = initializeApp(firebaseConfig);
// console.log(app);
const auth = getAuth(app);
// console.log(auth);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// if statment that checks if user is logged in
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
        const uid = user.id;
        const username = user.displayName;
        displayName.innerHTML = username;
        console.log(username);
    } else {
        console.log('No user');
        window.location = '/index.html';
    }
});
