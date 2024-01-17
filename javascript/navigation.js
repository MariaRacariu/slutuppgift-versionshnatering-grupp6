const loginPageHtml = document.getElementById("loginPageHTML");
const nameOfLogo = document.getElementById("nameOfLogo");

if (loginPageHtml) {
  nameOfLogo.style.display = "flex";
}

const navigationBar = document.getElementById("navigationBarID");
const homeLink = document.getElementById("homeLink");
const aboutLink = document.getElementById("aboutLink");
const contactLink = document.getElementById("contactLink");
// const navigationID = document.getElementById("navigationID");
const logoIconID = document.getElementById("logoIconID");
const navigationContent = document.getElementById("navigationContent");
const darkMode = document.getElementById("darkMode");
const lightMode = document.getElementById("lightMode");
const iconClose = document.getElementById("iconClose");

navigationBar.addEventListener("click", function () {
  navigationContent.style.cssText =
    "display: flex; flex-direction: column; align-items: center; justify-content: center;";

  homeLink.style.display = "flex";

  aboutLink.style.display = "flex";

  contactLink.style.display = "flex";

  darkMode.style.display = "flex";
  lightMode.style.display = "flex";

  iconClose.classList.remove("hide");

  logoIconID.style.display = "none";
  navigationBar.style.display = "none";
  navigationBar.classList.add("hide");
  navigationContent.classList.add("open-navigation");
});
