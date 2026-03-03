const startGameBtn: HTMLButtonElement | null =
	document.querySelector("#startGame");

export function initIntroScreen() {
	if (startGameBtn) {
		startGameBtn.addEventListener("click", markIntroScreenAsCompleted, {
			once: true,
		});
	}
}

export function hideIntroScreen() {
	startGameBtn!.classList.add("hidden");
}

export function showIntroScreen() {
	startGameBtn!.classList.remove("hidden");
}

function markIntroScreenAsCompleted() {
	dispatchEvent(new Event("INTRO_COMPLETE"));

	hideIntroScreen();
}
