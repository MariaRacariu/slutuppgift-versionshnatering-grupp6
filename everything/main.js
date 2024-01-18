import { saveDB } from "./data.js";
import { login } from "../script.js";
import { logout } from "../script.js";
// console.log('main runs');

const logoutBtn = document.querySelector("#logoutBtn").addEventListener("click", logout);
const loginBtn = document.querySelector("#loginBtn").addEventListener("click", login);

const sendButton = document.querySelector("#sendButton").addEventListener("click", saveDB);