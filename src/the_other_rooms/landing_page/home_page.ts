const startButton = document.querySelector<HTMLButtonElement>("#start-button");
const highscoreButton = document.querySelector<HTMLButtonElement>("#highscore-button");
const aboutButton = document.querySelector<HTMLButtonElement>("#about-button");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

startButton?.addEventListener("click", () => {
  document.getElementById("home-page")?.classList.add("hidden");
  header?.removeAttribute("hidden");
  footer?.removeAttribute("hidden");
  (window as any).showRoom("room1");
});

// highscore
highscoreButton?.addEventListener("click", () => {
  document.getElementById("home-page")?.classList.add("hidden");
  header?.removeAttribute("hidden");
  footer?.removeAttribute("hidden");
  (window as any).showRoom("highscore-page");
});

// Om oss
aboutButton?.addEventListener("click", () => {
  document.getElementById("home-page")?.classList.add("hidden");
  header?.removeAttribute("hidden");
  footer?.removeAttribute("hidden");
  (window as any).showRoom("about-us-page");
});

export {};