import { logout } from "./modules/logout.js";

const logoutBtn = document.querySelector("#logOutButton").addEventListener("click", logout);
const displayName = document.querySelector("#usernameDisplay");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, child, push, update, query, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// if statment that checks if user is logged in
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
        const username = user.displayName;
        displayName.innerHTML = username;
        sendData(username);
    } else {
        console.log('No user');
        window.location = '/index.html';
    }
});


function sendData(username) {
    const userMessageButton = document.querySelector("#userMessageButton").addEventListener("click", postMessage);
    var userMessageInput = document.querySelector("#userMessageInput").value;

    function postMessage() {
        // const messageData = {
        //     username: username,
        //     message: userMessageInput,
        // }

        // const updates = {};
        // // const newPostKey = push(child(ref(database), 'users')).key;


        // updates['messages/'] = messageData;

        // update(ref(database), updates);




    }
}

const messageUpdate = ref(database, 'messages/');

onValue(messageUpdate, (snapshot) => {
    const data = snapshot.val();
    console.log(snapshot.val());

    const messageList = document.querySelector("#messageList");
    // for (const message of data) {
    //     console.log(message);
    // }
    const message = "test";
    const username = "maria";
    messageList.innerHTML = `
            <li class="message-item">
                <div class="message-item_content">
                    <div class="message-item_author">${username}</div>
                    <div class="message-item_text">${message}</div>
                </div>
                <div class="message-item_actions">
                    <button class="btn primary">Edit</button>
                    <button class="btn negative">Delete</button>
                </div>
            </li>
        `;
});