// Cached element references used across room startup and interaction logic.
type Room1Elements = {
	landing: HTMLElement | null;
	content: HTMLElement | null;
	startButton: HTMLElement | null;
	keyhole: HTMLElement | null;
	message: HTMLElement | null;
	endButton: HTMLButtonElement | null;
};

// Shape persisted in localStorage after each completed run of Room 1.
type Room1Result = {
	letter: string;
	timeMs: number;
	finishedAt: string;
};

// Valid key choices in this room (spells LEVA).
const ROOM1_KEYS = [
	{ buttonId: "keyL", letter: "L" },
	{ buttonId: "keyE", letter: "E" },
	{ buttonId: "keyV", letter: "V" },
	{ buttonId: "keyA", letter: "A" },
];

const ROOM1_FALL_DURATION_MS = 12000;
const ROOM1_RESULTS_STORAGE_KEY = "room1Results";

// Timer state for the room-specific elapsed time display.
let room1StartTime = 0;
let room1TimerId: number | null = null;
let room1ElapsedMs = 0;

// Gather all Room 1 DOM dependencies in one place.
function getRoom1Elements(): Room1Elements {
	return {
		landing: document.getElementById("room1StartPage"),
		content: document.getElementById("room1Container"),
		startButton: document.getElementById("room1StartButton"),
		keyhole: document.getElementById("keyhole"),
		message: document.getElementById("fallMessage"),
		endButton: document.getElementById(
			"room1EndButton",
		) as HTMLButtonElement | null,
	};
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

// Validates selection, resolves room, stores result, and reveals continue button.
function bindKeyhole(
	keyhole: HTMLElement | null,
	message: HTMLElement | null,
	endButton: HTMLButtonElement | null,
): void {
	if (!keyhole) {
		return;
	}

	keyhole.onclick = () => {
		const selectedKey = window.selectedKey;
		if (!selectedKey || !message) {
			setRoom1Message(
				message,
				"Du måste välja en nyckel för att låsa upp dörren!",
			);
			return;
		}

		setRoom1Message(
			message,
			`<img src="public/Room1_bilder/room1Star.png" alt="En gyllene stjärna." width="100px" height="150px" aria-hidden="true"> Du klarade utmaningen! Klicka på "Gå vidare" för att spara din artefakt ${selectedKey}. <img src="public/Room1_bilder/room1Star.png" alt="En gyllene stjärna." width="100px" height="150px" aria-hidden="true">`,
		);

		const finalMs = stopRoom1Timer();
		saveRoom1Result(selectedKey, finalMs);

		if (endButton) {
			endButton.dataset.artifactLetter = selectedKey;
			endButton.classList.remove("hidden");
		}
	};
}

function attachRoom1Listeners(elements: Room1Elements): void {
	resetRoom1State(elements.endButton);
	bindKeySelection(elements.message);
	bindKeyhole(elements.keyhole, elements.message, elements.endButton);
}

// Smoothly scrolls the falling background over a fixed duration.
function startFallingAnimation(scrollContainer: HTMLElement): void {
	const start = scrollContainer.scrollTop;
	const startTime = performance.now();

	function animateScroll(currentTime: number): void {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / ROOM1_FALL_DURATION_MS, 1);
		const maxScroll =
			scrollContainer.scrollHeight - scrollContainer.clientHeight;
		scrollContainer.scrollTop = start + (maxScroll - start) * progress;

		if (progress < 1) {
			requestAnimationFrame(animateScroll);
		}
	}

	requestAnimationFrame(animateScroll);
}

function startRoom1GameLogic(): void {
	const scrollContainer = document.querySelector(
		"#room1 .backgroundScroll",
	) as HTMLElement | null;

	// Wait for image load if needed to get reliable scroll height values.
	if (scrollContainer) {
		const backgroundImage = scrollContainer.querySelector(
			".backgroundImage",
		) as HTMLImageElement | null;

		if (backgroundImage && !backgroundImage.complete) {
			backgroundImage.addEventListener(
				"load",
				() => startFallingAnimation(scrollContainer),
				{ once: true },
			);
		} else {
			startFallingAnimation(scrollContainer);
		}
	}

	// Initial instruction shown when the room begins.
	setRoom1Message(
		document.getElementById("fallMessage"),
		"Fort! Välj en nyckel innan du landar!",
	);
}

// Public entry point called by the main flow to initialize Room 1.
export function initRoom1(): void {
	const elements = getRoom1Elements();
	showStartPage(elements.landing, elements.content);

	if (!elements.startButton) {
		return;
	}

	// Start button transitions from intro screen to active room state.
	elements.startButton.onclick = () => {
		showGame(elements.landing, elements.content);
		startRoom1Timer();
		attachRoom1Listeners(elements);
		startRoom1GameLogic();
	};
}

window.initRoom1 = initRoom1;
