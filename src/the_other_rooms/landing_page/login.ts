const loginButton = document.querySelector("#login-button");
const usernameInput = document.querySelector<HTMLInputElement>("#username-input");
const loginPage = document.getElementById("login-page");
const homePage = document.getElementById("home-page");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const welcomeText = document.getElementById("welcome-text");

// göm header och footer så länge man är på login/startsida
header?.setAttribute("hidden", "");
footer?.setAttribute("hidden", "");

loginButton?.addEventListener("click", () => {
  const username = usernameInput?.value.trim();

  if (!username) {
    alert("Skriv ditt namn först");
    return;
  }

  localStorage.setItem("playerName", username);

  if (welcomeText) {
    welcomeText.textContent = `Hej ${username}!`;
  }

  loginPage?.classList.add("hidden");
  homePage?.classList.remove("hidden");
});