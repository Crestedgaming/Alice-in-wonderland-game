import { stopTimer } from "../../utils";
import { displayHighscores } from "../highscore/highscore";

export function showGameCompleted() {
  console.log("Congratulations! You've completed the game.");
  stopTimer();
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });
  // Visa highscore-sidan direkt när spelet är klart
  document.getElementById("highscore-page")?.classList.remove("hidden");
  console.log("Game completed! Displaying high scores...");
  displayHighscores();
}

const restartBtn = document.getElementById("restart-game");
const highscoreBtn = document.getElementById("show-highscore-from-win");

restartBtn?.addEventListener("click", () => {
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });
  document.getElementById("start")?.classList.remove("hidden");
});

highscoreBtn?.addEventListener("click", () => {
  // Dölj alla rum
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });
  // Visa highscore-sidan
  document.getElementById("highscore-page")?.classList.remove("hidden");
  // Uppdatera highscore-listan
  displayHighscores();
});