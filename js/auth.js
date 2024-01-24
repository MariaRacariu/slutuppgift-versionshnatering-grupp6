import {
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

export function initializeAuthStateListener(auth) {
  //initialize an event listerner that listens to changes in auth object
  return;
}

export function signInWithGoogle(auth, provider) {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Andréa added this part. Audio that triggers when user have succesfully signed in.
      const loginSound = new Audio('../audio/login-sound.mp3');
      loginSound.volume = 0.3;
      loginSound.play();

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      loginSound.addEventListener('ended', () => {
        return { token: token, user: user };
      });



      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function signOutFromGoogle(auth) {
  signOut(auth)
    .then(() => {
      console.log("sign out successful");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
