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

// The query for seeting up the database structure
const messagesQuery = query(
  collection(db, "messages"),
  orderBy("created", "desc"),
  limit(10)
);

let messages = [];

// Declaring current user varibale to user globaly
let currentUser;

// Checks if user is online
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

// Create message in database and fill with data
// If user exists/logged in otherwise use Strager
// Message value from message input
// Created time get local time
// User id if logged in otherwise 0
async function handleMessageCreation(event) {
  event.preventDefault();
  let time = new Date();
  const message = $("#messageTextArea").val();
  if(message === 'todays weather'){
    const weather = getWeather();
    weather.then(data => {
      if(data && data.timeSeries && data.timeSeries.length){
        const cel = data.timeSeries[0].parameters.find(p => p.name === 't');
        alert(`It is ${cel.values[0]} degrees Celcius in Malmö`);
      }
    })
  }else{
    const docRef = await addDoc(collection(db, "messages"), {
      authorName: currentUser?.displayName || "Stranger",
      message: sanitize(message),
      created: time.getTime(),
      userid: currentUser?.uid || 0,
    });
    render();
    console.log("Document written with ID: ", docRef.id);
  }
}

// Update page with new massage from database
async function handleMessageUpdate(event) {
  console.log("updating");
  event.preventDefault();
  let docRef = doc(db, "messages", editDocument?.id);
  await updateDoc(docRef, {
    message: sanitize($("#messageTextArea").val()),
  });
  render();
  console.log("Document updated with ID: ", docRef.id);
  toggleEditMode();
}

// Delete message
export async function handleMessageDelete(docid) {
  await deleteDoc(doc(db, "messages", docid));
}

// Edit Message
export function toggleEditMode(id, message) {
  editMode = !editMode;
  editDocument = { id, message };
  render();
}

// Created html elements
// So very time an action happens you call render for it to "render" html elemnts for that part
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

function sanitize(message) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return message.replace(reg, (match)=>(map[match]));
}

// signInWithGoogle(auth, provider);

//Wheather function by Angelica
async function getWeather(){
  const url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/12/lat/55/data.json";
  let response = await fetch(url, {});
  let data = await response.json();
  return data;
}