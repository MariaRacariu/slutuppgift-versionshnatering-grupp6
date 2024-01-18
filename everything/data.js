// console.log("data runs");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

const userLoggedInName = auth;
console.log(userLoggedInName.displayName);

export function saveDB() {


    console.log("function runs");
    const name = document.querySelector("#fullName").value;
    const msg = document.querySelector("#message").value;

    console.log(msg);



    // Set will find the reference and delete then replace with new
    // Use for editing msg

    // set(ref(database, 'messages/' + name), {
    //     message: msg,
    // });


    // this creates a post id
    const newPostKey = push(child(ref(database), 'messages')).key;

    // create a new array called updates
    const updates = {};
    // populate the array, if name in messages exists add new posts id
    // with the new message, if the name doesn't exist it creates a
    // new one  
    updates['/messages/' + name + '/' + newPostKey] = msg;

    // return updated array which updates the db
    return update(ref(database), updates);

}