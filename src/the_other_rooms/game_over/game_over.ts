export function showGameCompleted() {
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });

  const completed = document.getElementById("game-completed");
  completed?.classList.remove("hidden");
}
const restartBtn = document.getElementById("restart-game");

restartBtn?.addEventListener("click", () => {
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });

  document.getElementById("start")?.classList.remove("hidden");
});