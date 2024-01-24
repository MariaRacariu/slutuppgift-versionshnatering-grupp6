import { signInWithGoogle, signOutFromGoogle } from "../auth.js";



export function createHeader(auth, provider, user) {
  const header = $("<div class='header'></div>");
  if (user) {
    header.append("<p>Welcome <b>" + user.displayName + "</b></p>");
    let logoutButton = $("<button class='btn button delete'>Logout</button>");
    logoutButton.on("click", () => signOutFromGoogle(auth));
    header.append(logoutButton);
  } else {
    header.append("Welcome, stranger!");
    let buttonContainer = $("<div class='buttonContainer'></div>");
    header.append(buttonContainer);

    let loginButton = $("<button class='btn button primary'>Login with Google</button>");
    loginButton.on("click", () => signInWithGoogle(auth, provider));
    buttonContainer.append(loginButton);

    var button = $("<button class='btn button delete'> Read me!</button > ");
    button.on("click", () => alert("Warning! If you don't log in, you will not have the right to delete or edit your messages. If your messages are dangerous or offensive they will be deleted by admin!"));
    buttonContainer.append(button);
  }

  return header;
}