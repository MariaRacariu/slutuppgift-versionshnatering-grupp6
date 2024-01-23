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