export function showGameCompleted() {
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });

  const completed = document.getElementById("game-completed");
  completed?.classList.remove("hidden");
}