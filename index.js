import { navigationItems, listItemsData } from "./helper.js";

const body = document.body;
const header = document.querySelector("header");
const navMenu = document.getElementById("navMenu");
const toggleButton = document.getElementById("toggleButton");
const listElement = document.getElementById("list");
let darkModeEnabled = false;

toggleButton.addEventListener("click", function () {
  darkModeEnabled = !darkModeEnabled;
  if (darkModeEnabled) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

function enableDarkMode() {
  body.classList.add("dark-mode");
  header.classList.add("header-dark-mode");
}

function disableDarkMode() {
  body.classList.remove("dark-mode");
  header.classList.remove("header-dark-mode");
}

function createSubMenuItems(listItemsData, parentElement) {
  listItemsData.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = item;
    listItem.appendChild(link);
    parentElement.appendChild(listItem);
  });
}
function showSubMenu(listItemsData) {
  listElement.innerHTML = "";

  createSubMenuItems(listItemsData, listElement);
}
const navList = document.createElement("ul");
navList.classList.add("nav-list");

navigationItems.forEach((item) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = item.label;
  link.href = item.url;
  link.classList.add("nav-link");

  link.addEventListener("click", function (event) {
    event.preventDefault();
    if (item.label === "Services >") {
      showSubMenu(listItemsData);
    } else if (item.label === "Tutorials >") {
      showSubMenu([...listItemsData, ...["Documentation", "Frameworks", "MDN Web Docs"]]);
    } else {
      listElement.innerHTML = "";
    }
    setActiveLink(this);
  });
  listItem.appendChild(link);
  navList.appendChild(listItem);
});
navMenu.appendChild(navList);

function setActiveLink(activeLink) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}
