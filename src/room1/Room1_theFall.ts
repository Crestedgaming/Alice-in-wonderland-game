import { completeRoom } from "../engine/GameManager";

type Room1Elements = {
	landing: HTMLElement | null;
	content: HTMLElement | null;
	startButton: HTMLButtonElement | null;
	keyhole: HTMLButtonElement | null;
	message: HTMLElement | null;
	endButton: HTMLButtonElement | null;
	roomTimer: HTMLElement | null;
};

type Room1Result = {
	letter: string;
	timeMs: number;
	finishedAt: string;
};

const ROOM1_KEYS = [
	{ buttonId: "keyL", letter: "L" },
	{ buttonId: "keyE", letter: "E" },
	{ buttonId: "keyV", letter: "V" },
	{ buttonId: "keyA", letter: "A" },
];

const ROOM1_FALL_DURATION_MS = 12000;
const ROOM1_RESULTS_STORAGE_KEY = "room1Results";

let room1StartTime = 0;
let room1TimerId: number | null = null;
let room1ElapsedMs = 0;

function getRoom1Elements(): Room1Elements {
	return {
		landing: document.getElementById("room1StartPage"),
		content: document.getElementById("room1Container"),
		startButton: document.getElementById(
			"room1StartButton",
		) as HTMLButtonElement | null,
		keyhole: document.getElementById("keyhole") as HTMLButtonElement | null,
		message: document.getElementById("fallMessage"),
		endButton: document.getElementById(
			"room1EndButton",
		) as HTMLButtonElement | null,
		roomTimer: document.getElementById("gameTimerEachRoom"),
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

function showStartPage(
	landing: HTMLElement | null,
	content: HTMLElement | null,
): void {
	landing?.classList.remove("hidden");
	content?.classList.add("hidden");
}

function showGame(
	landing: HTMLElement | null,
	content: HTMLElement | null,
): void {
	landing?.classList.add("hidden");
	content?.classList.remove("hidden");
}

function updateRoom1TimerDisplay(
	timerEl: HTMLElement | null,
	elapsedMs: number,
): void {
	if (!timerEl) {
		return;
	}
	timerEl.textContent = `Tid i rummet: ${formatMs(elapsedMs)}`;
}

function startRoom1Timer(timerEl: HTMLElement | null): void {
	if (room1TimerId !== null) {
		clearInterval(room1TimerId);
	}

	room1StartTime = Date.now();
	room1ElapsedMs = 0;
	updateRoom1TimerDisplay(timerEl, 0);

	room1TimerId = window.setInterval(() => {
		room1ElapsedMs = Date.now() - room1StartTime;
		updateRoom1TimerDisplay(timerEl, room1ElapsedMs);
	}, 250);
}

function stopRoom1Timer(timerEl: HTMLElement | null): number {
	if (room1TimerId !== null) {
		clearInterval(room1TimerId);
		room1TimerId = null;
	}

	if (room1StartTime > 0) {
		room1ElapsedMs = Date.now() - room1StartTime;
	}

	updateRoom1TimerDisplay(timerEl, room1ElapsedMs);
	return room1ElapsedMs;
}

function saveRoom1Result(letter: string, timeMs: number): void {
	const result: Room1Result = {
		letter,
		timeMs,
		finishedAt: new Date().toISOString(),
	};

	const raw = localStorage.getItem(ROOM1_RESULTS_STORAGE_KEY);
	let results: Room1Result[] = [];

	if (raw) {
		try {
			const parsed = JSON.parse(raw) as Room1Result[];
			if (Array.isArray(parsed)) {
				results = parsed;
			}
		} catch {
			results = [];
		}
	}

	results.push(result);
	localStorage.setItem(ROOM1_RESULTS_STORAGE_KEY, JSON.stringify(results));
}

function resetRoom1State(endButton: HTMLButtonElement | null): void {
	window.selectedKey = null;
	if (endButton) {
		endButton.classList.add("hidden");
	}
}

function bindKeySelection(message: HTMLElement | null): void {
	ROOM1_KEYS.forEach(({ buttonId, letter }) => {
		const button = document.getElementById(
			buttonId,
		) as HTMLButtonElement | null;
		if (!button) {
			return;
		}

		button.onclick = () => {
			window.selectedKey = letter;
			const keyIcon = button.querySelector("img") as HTMLImageElement | null;

			if (keyIcon) {
				setRoom1Message(
					message,
					`Du har valt den har nyckeln! <img src="${keyIcon.src}" alt="${keyIcon.alt}" width="44" height="44">`,
				);
				return;
			}

			setRoom1Message(message, `Du har valt nyckeln med bokstaven ${letter}!`);
		};
	});
}

function bindKeyhole(
	keyhole: HTMLButtonElement | null,
	message: HTMLElement | null,
	endButton: HTMLButtonElement | null,
	roomTimer: HTMLElement | null,
): void {
	if (!keyhole) {
		return;
	}

	keyhole.onclick = () => {
		const selectedKey = window.selectedKey;
		if (!selectedKey) {
			setRoom1Message(
				message,
				"Du maste valja en nyckel for att lasa upp dorren!",
			);
			return;
		}

		setRoom1Message(
			message,
			`Du klarade utmaningen! Bokstaven ${selectedKey} sparades.`,
		);

		const finalMs = stopRoom1Timer(roomTimer);
		saveRoom1Result(selectedKey, finalMs);

		completeRoom(1, selectedKey);
		if (typeof window.updateFooterContext === "function") {
			window.updateFooterContext("room1", true);
		}

		if (endButton) {
			endButton.classList.add("hidden");
		}
	};
}

function attachRoom1Listeners(elements: Room1Elements): void {
	resetRoom1State(elements.endButton);
	bindKeySelection(elements.message);
	bindKeyhole(
		elements.keyhole,
		elements.message,
		elements.endButton,
		elements.roomTimer,
	);
}

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

	setRoom1Message(
		document.getElementById("fallMessage"),
		"Fort! Valj en nyckel innan du landar!",
	);
}

export function initRoom1(): void {
	const elements = getRoom1Elements();
	showStartPage(elements.landing, elements.content);

	if (!elements.startButton) {
		return;
	}

	elements.startButton.onclick = () => {
		showGame(elements.landing, elements.content);
		startRoom1Timer(elements.roomTimer);
		attachRoom1Listeners(elements);
		startRoom1GameLogic();
	};
}

window.initRoom1 = initRoom1;
