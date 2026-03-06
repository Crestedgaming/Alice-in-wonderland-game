const loginButton = document.querySelector("#login-button");
const loginPage = document.getElementById("login-page");
const homePage = document.getElementById("home-page");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

// göm header och footer så länge man är på login/startsida
header?.setAttribute("hidden", "");
footer?.setAttribute("hidden", "");

loginButton?.addEventListener("click", () => {
  loginPage?.setAttribute("hidden", "");
  homePage?.removeAttribute("hidden");
});