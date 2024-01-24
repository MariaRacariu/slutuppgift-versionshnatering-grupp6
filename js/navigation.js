const navCloseIcon = document.getElementById("navCloseIcon");
const navBarIcon = document.getElementById("navBarIcon");
const nav = document.getElementById("mainNav");


const themeSwitcher = document.getElementById("theme-switcher");
themeSwitcher.addEventListener("click", toggleTheme);

const doc = document.documentElement;
const theme = () => doc.getAttribute("data-theme");

if (!theme()) {
    doc.setAttribute("data-theme", "light");
    themeSwitcher.innerHTML = "light";
}
//Checks if localStorage is saved
if (localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "light");
    doc.setAttribute("data-theme", "light");
    themeSwitcher.innerHTML = "Dark";
} else if (localStorage.getItem("theme") === "dark") {
    doc.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeSwitcher.innerHTML = "Light";
} else {
    localStorage.setItem("theme", "light");
    doc.setAttribute("data-theme", "light");
    themeSwitcher.innerHTML = "Dark";
}

function toggleTheme() {
    if (theme() === "light") {
        // Dark theme
        doc.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeSwitcher.innerHTML = "Light";
    } else if (theme() === "dark") {
        // Light Theme
        localStorage.setItem("theme", "light");
        doc.setAttribute("data-theme", "light");
        themeSwitcher.innerHTML = "Dark";
    }
}



navCloseIcon.addEventListener("click", () => {
    nav.classList.remove("open");
});

navBarIcon.addEventListener("click", () => {
    nav.classList.add("open");
});