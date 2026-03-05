
const startButton = document.querySelector<HTMLButtonElement>("#start-button");
const highscoreButton = document.querySelector<HTMLButtonElement>("#highscore-button");
const aboutButton = document.querySelector<HTMLButtonElement>("#about-button");

startButton?.addEventListener("click", () => {

  // göm startsida
  document.getElementById("home-page")?.classList.add("hidden");

  // visa room1
  (window as any).showRoom("room1");
});

  // highscore
highscoreButton?.addEventListener("click", () => {
});

  // Om oss
aboutButton?.addEventListener("click", () => {
});

export {};