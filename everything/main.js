import { saveDB } from "./data.js";
import { login } from "../script.js";
import { logout } from "../script.js";
// console.log('main runs');



const sendButton = document.querySelector("#sendButton").addEventListener("click", saveDB);