let room1StartTime = 0;
let room1TimerId: number | null = null;
let room1ElapsedMs = 0;
let room1Unlocked = false;

const ROOM1_KEYS = [
	{ buttonId: "keyL", letter: "L" },
	{ buttonId: "keyE", letter: "E" },
	{ buttonId: "keyV", letter: "V" },
	{ buttonId: "keyA", letter: "A" },
];

function startRoom1Timer() {
	room1StartTime = Date.now();
	room1ElapsedMs = 0;

	if (room1TimerId !== null) window.clearInterval(room1TimerId);

	const roomTimerEl = document.getElementById("gameTimerEachRoom");
	room1TimerId = window.setInterval(() => {
		room1ElapsedMs = Date.now() - room1StartTime;
		if (roomTimerEl)
			roomTimerEl.textContent = `Tid i rummet: ${formatMs(room1ElapsedMs)}`;
	}, 100);
}

function stopRoom1Timer(): number {
	if (room1TimerId !== null) {
		window.clearInterval(room1TimerId);
		room1TimerId = null;
	}
	room1ElapsedMs = Date.now() - room1StartTime;
	return room1ElapsedMs;
}

function formatMs(ms: number): string {
	const totalSec = Math.floor(ms / 1000);
	const min = Math.floor(totalSec / 60);
	const sec = totalSec % 60;
	return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function setRoom1Message(messageEl: HTMLElement | null, text: string): void {
	if (messageEl) {
		messageEl.innerHTML = `<p>${text}</p>`;
	}
}

// Show the landing page and hide the game

export function initRoom1() {
	// Get the start page and game content for Room 1.
	const landing = document.getElementById("room1StartPage");
	const content = document.getElementById("room1Container");
	if (landing && content) {
		// Show the start page first and hide the actual game.
		landing.classList.remove("hidden");
		content.classList.add("hidden");
	}
	const startBtn = document.getElementById("room1StartButton");
	const progressTestBtn = document.getElementById("room1ProgressTestButton");
	if (startBtn) {
		startBtn.onclick = function () {
			// When the player clicks start, show the game and hide the start page.
			if (landing && content) {
				landing.classList.add("hidden");
				content.classList.remove("hidden");
			}
			// Attach listeners and start the room game logic.
			startRoom1Timer();
			attachRoom1Listeners();
			startRoom1GameLogic();
		};
	}

	if (progressTestBtn) {
		progressTestBtn.onclick = function () {
			if (typeof window.markRoomFinished === "function") {
				window.markRoomFinished("room1");
			}
		};
	}
}
window.initRoom1 = initRoom1;

// Attach events to keys and keyhole
function attachRoom1Listeners() {
	const keyhole = document.getElementById("keyhole");
	const message = document.getElementById("fallMessage");
	const endButton =
		document.getElementById("room1-next") ||
		document.getElementById("room1EndButton");
	const artefactsSpan = document.querySelector("#artefact1 span");

	// No key is selected when the room starts.
	window.selectedKey = null;
	room1Unlocked = false;

	if (endButton) {
		endButton.classList.add("hidden");
		endButton.onclick = function () {
			if (room1Unlocked && typeof window.markRoomFinished === "function") {
				window.markRoomFinished("room1");
			}
			if (room1Unlocked && typeof window.updateFooterContext === "function") {
				window.updateFooterContext("room1", true);
			}
			if (typeof window.showRoom === "function") {
				window.showRoom("rum2");
			}
		};
	}

	ROOM1_KEYS.forEach(({ buttonId, letter }) => {
		const button = document.getElementById(buttonId);
		if (!button) return;

		button.onclick = () => {
			window.selectedKey = letter;
			setRoom1Message(message, `Du har valt nyckeln med bokstaven ${letter}!`);
		};
	});

	if (keyhole)
		keyhole.onclick = function () {
			// Read which key the player selected most recently.
			const selectedKey = window.selectedKey;
			if (selectedKey && message) {
				// Show confirmation and write the letter to the artifact slot.
				setRoom1Message(
					message,
					`Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!`,
				);
				if (artefactsSpan) artefactsSpan.textContent = selectedKey;
				const finalMs = stopRoom1Timer();
				saveRoom1Result(selectedKey, finalMs);
				room1Unlocked = true;
				if (endButton) {
					endButton.classList.remove("hidden");
				}
			} else {
				setRoom1Message(
					message,
					"Du måste välja en nyckel för att låsa upp dörren!",
				);
			}
		};
}

// Simple scroll and start message
function startRoom1GameLogic() {
	// Get the container that scrolls during the fall.
	const scrollContainer = document.querySelector(
		"#room1 .backgroundScroll",
	) as HTMLElement;
	if (scrollContainer) {
		const backgroundImage = scrollContainer.querySelector(
			".backgroundImage",
		) as HTMLImageElement | null;

		const startFallingAnimation = () => {
			const start = scrollContainer.scrollTop;
			const duration = 12000;
			const startTime = performance.now();

			// Smooth animation that scrolls from top to bottom.
			function animateScroll(currentTime: number) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				// Recalculate max scroll continuously for stable behavior across browsers and late image loads.
				const maxScroll =
					scrollContainer.scrollHeight - scrollContainer.clientHeight;
				scrollContainer.scrollTop = start + (maxScroll - start) * progress;
				if (progress < 1) {
					requestAnimationFrame(animateScroll);
				}
			}

			requestAnimationFrame(animateScroll);
		};

		if (backgroundImage && !backgroundImage.complete) {
			backgroundImage.addEventListener("load", startFallingAnimation, {
				once: true,
			});
		} else {
			startFallingAnimation();
		}
	}

	// Initial message for the player.
	setRoom1Message(
		document.getElementById("fallMessage"),
		"Fort! Välj en nyckel innan du landar!",
	);
}

function saveRoom1Result(letter: string, timeMs: number) {
	const storageKey = "room1Results";
	const previous = localStorage.getItem(storageKey);
	const results = previous
		? (JSON.parse(previous) as Array<{
				letter: string;
				timeMs: number;
				finishedAt: string;
			}>)
		: [];

	results.push({
		letter,
		timeMs,
		finishedAt: new Date().toISOString(),
	});

	localStorage.setItem(storageKey, JSON.stringify(results));
}
