import { signInWithGoogle, signOutFromGoogle } from "../auth.js";

export function createHeader(auth, provider, user) {
  const header = $("<div class='header'></div>");
  if (user) {
    header.append("<p>Welcome <b>" + user.displayName + "</b></p>");
    let logoutButton = $("<button class='button'>Logout</button>");
    logoutButton.on("click", () => signOutFromGoogle(auth));
    header.append(logoutButton);
  } else {
    header.append("Welcome, stranger!");
    let loginButton = $("<button class='button'>Login with Google</button>");
    loginButton.on("click", () => signInWithGoogle(auth, provider));
    header.append(loginButton);
  }
  return header;
}
