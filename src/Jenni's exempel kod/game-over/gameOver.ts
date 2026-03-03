const gameOverContainer: HTMLDivElement | null =
	document.querySelector("#game-over");
const restartGameBtn: HTMLButtonElement | null =
	document.querySelector("#restart-game");

export function initGameOver() {
	console.log("Game over initialized");

	if (gameOverContainer) {
		gameOverContainer.classList.remove("hidden");
	}

	restartGameBtn?.addEventListener("click", restartGame, { once: true });
}

export function hideGameOver() {
	gameOverContainer?.classList.add("hidden");
}

function restartGame() {
	dispatchEvent(new Event("RESTART_GAME"));
}
