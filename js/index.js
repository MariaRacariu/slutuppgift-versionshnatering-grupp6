import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

import { createHeader } from "./modules/header.js";
import { createMessageList } from "./modules/messageList.js";
import { createMessageForm } from "./modules/messageForm.js";

const firebaseConfig = {
  apiKey: "AIzaSyAget9jBYf9VTtZBwkWwK_6FqUB-jkprr8",
  authDomain: "version-control-5d75e.firebaseapp.com",
  projectId: "version-control-5d75e",
  storageBucket: "version-control-5d75e.appspot.com",
  messagingSenderId: "755338134385",
  appId: "1:755338134385:web:dadffb340f31e50e982cd0",
  measurementId: "G-Y2Q10Q5YMM",
};
const root = $("#root");
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

let editMode = false;
let editDocument;

const messagesQuery = query(
  collection(db, "messages"),
  orderBy("created", "desc"),
  limit(10)
);
let messages = [];

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user detected: " + user.displayName);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    currentUser = user;

    // ...
  } else {
    // User is signed out
    console.log("no user detected");
    currentUser = null;
  }
  render();
});

async function handleMessageCreation(event) {
  event.preventDefault();
  let time = new Date();
  const docRef = await addDoc(collection(db, "messages"), {
    authorName: currentUser?.displayName || "Stranger",
    message: $("#messageTextArea").val(),
    created: time.getTime(),
    userid: currentUser?.uid || 0,
  });
  render();
  console.log("Document written with ID: ", docRef.id);
}

async function handleMessageUpdate(event) {
  console.log("updateing");
  event.preventDefault();
  let docRef = doc(db, "messages", editDocument?.id);
  await updateDoc(docRef, {
    message: $("#messageTextArea").val(),
  });
  render();
  console.log("Document updated with ID: ", docRef.id);
  toggleEditMode();
}

export async function handleMessageDelete(docid) {
  await deleteDoc(doc(db, "messages", docid));
}

export function toggleEditMode(id, message) {
  editMode = !editMode;
  editDocument = { id, message };
  render();
}

function render() {
  root.html("");
  root.append(
    createHeader(auth, provider, currentUser),
    createMessageList(messages, currentUser, editMode),
    createMessageForm(
      handleMessageCreation,
      handleMessageUpdate,
      editMode,
      editDocument
    )
  );
}

const unsub = onSnapshot(messagesQuery, (querySnapshot) => {
  messages = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc);
  });
  messages = messages.reverse();
  render();
});

// signInWithGoogle(auth, provider);
