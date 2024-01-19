// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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


// if statment that checks if user is logged in
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
        // window.location = '/dashboard.html';
    } else {
        console.log('No user');
        // window.location = '/index.html';
    }
});

const logoutBtn = document.querySelector("#logOutButton").addEventListener("click", logout);
const loginBtn = document.querySelector("#logInButton").addEventListener("click", login);

// function login() {
//     // If user is not logged in it will trigger the pop up to log in with google 
//     // SO signInWithPopup is a promise
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // console.log(token);

//             // The signed-in user info.
//             // gives you the display name of the user and their email and much more info (but idk wtf it means)
//             const user = result.user;
//             // console.log(user);
//             // console.log(user.displayName)
//             // const userData = user.displayName;
//             // console.log(result);
//             // window.location = '/dashboard.html';
//             // Promise.all([result]).then((result) => {
//             //     return result;
//             // });
//             return result;
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
//     console.log(result);
// }

function logout() {
    auth.signOut(GoogleAuthProvider);
    window.location = '/index.html';
    // console.log("You are logged out");
}

