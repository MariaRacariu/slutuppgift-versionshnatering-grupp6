// const navigationBar = document.getElementById("navigationBarID");
// const homeLink = document.getElementById("homeLink");
// const aboutLink = document.getElementById("aboutLink");
// const contactLink = document.getElementById("contactLink");
// // const navigationID = document.getElementById("navigationID");
// const logoIconID = document.getElementById("logoIconID");
// const navigationContent = document.getElementById("navigationContent");
// const darkMode = document.getElementById("darkMode");
// const lightMode = document.getElementById("lightMode");
// const iconClose = document.getElementById("iconClose");
// const userMessageForm = document.getElementById("userMessageFormID");

// navigationBar.addEventListener("click", function () {
//   navigationContent.style.cssText =
//     "display: flex; flex-direction: column; align-items: center; justify-content: center;";

//   homeLink.style.display = "flex";

//   aboutLink.style.display = "flex";

//   contactLink.style.display = "flex";

//   darkMode.style.display = "flex";
//   lightMode.style.display = "flex";

//   iconClose.classList.remove("hide");

//   logoIconID.style.display = "none";
//   navigationBar.style.display = "none";
//   navigationBar.classList.add("hide");
//   navigationContent.classList.add("open-navigation");

//   userMessageForm.style.position = "inherit";
// });

const navCloseIcon = document.getElementById("navCloseIcon");
const navBarIcon = document.getElementById("navBarIcon");
const nav = document.getElementById("mainNav");

const themeSwitcher = document.getElementById("theme-switcher");

const doc = document.documentElement;
const theme = () => doc.getAttribute("data-theme");
if (!theme()) {
  doc.setAttribute("data-theme", "light");
  themeSwitcher.innerHTML = "light";
}

function toggleTheme() {
  if (theme() === "light") {
    doc.setAttribute("data-theme", "dark");
    themeSwitcher.innerHTML = "Light";
  } else if (theme() === "dark") {
    doc.setAttribute("data-theme", "light");
    themeSwitcher.innerHTML = "Dark";
  }
}

themeSwitcher.addEventListener("click", toggleTheme);

navCloseIcon.addEventListener("click", () => {
  nav.classList.remove("open");
});

navBarIcon.addEventListener("click", () => {
  nav.classList.add("open");
});
