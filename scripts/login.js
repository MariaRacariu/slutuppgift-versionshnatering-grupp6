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
        
         /* Andréa commented out this part
            
            // window.location = '/home.html'; 
            
            */
    } else {
        console.log('No user');
    }
});

const loginBtn = document.querySelector("#logInButton").addEventListener("click", login);


function login() {
    // If user is not logged in it will trigger the pop up to log in with google 
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            // gives you the display name of the user and their email and much more info
            const user = result.user;

            console.log(user);
            console.log(user.displayName)
            const userName = user.displayName;

            const test = "wawawwa";

            // const newPostKey = push(child(ref(database), 'users')).key;
            const userData = {
                email: user.email,
                // Test to se if messages would work
                // need unique id for eatch msg
                messages: {
                    text: test,
                },
            }

            // create a new array called updates
            const updates = {};
            // populate the array, if name in messages exists add new posts id
            // with the new message, if the name doesn't exist it creates a
            // new one  
            updates['users/' + userName + '/'] = userData;



            // return updated array which updates the db


            /* Andréa commented out this part
            
            // window.location = '/home.html'; 
            
            */
            
            return update(ref(database), updates);

        })

        //Andréa added this part. Audio that triggers when user have succesfully signed in.
        .then(() => {
            const loginSound = new Audio('./audio/login-sound.mp3');
            loginSound.play();
            loginSound.addEventListener('ended', () => {
                window.location = '/home.html';
            });

            
        })

        //End of Andréas code
        
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })

        
}

