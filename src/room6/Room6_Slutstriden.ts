import { startTimer, stopTimer, startTotalTimer, pauseTotalTimer } from "../utils";
import { completeRoom } from "../engine/GameManager";
import { handleGameWin } from "../main";
import { gameState } from "../engine/GameState";

let shuffleInterval: number | null = null;

const startBtn = document.getElementById("room6-start-btn");
const intro = document.getElementById("room6-intro");
const submitButton = document.getElementById("submit");

const boxes = document.querySelectorAll(".box");
const letters = document.querySelectorAll(".letter-btn");

let currentIndex = 0;

/* ---------------- START BUTTON ---------------- */

startBtn?.addEventListener("click", () => {
	startTimer("gameTimerEachRoom");
	startTotalTimer("gameTimerTotal");

	intro?.classList.add("hidden");

	shuffleLetters();

	if (shuffleInterval !== null) {
		clearInterval(shuffleInterval);
	}

	shuffleInterval = window.setInterval(shuffleLetters, 3000);
});

/* ---------------- LETTER CLICK ---------------- */

letters.forEach((letter) => {
	letter.addEventListener("click", () => {
		const btn = letter as HTMLButtonElement;

		if (currentIndex < 5 && btn.textContent) {
			const box = boxes[currentIndex];

			box.textContent = btn.textContent;
			box.classList.remove("box-placeholder");

			currentIndex++;
			btn.disabled = true;
		}
	});
});

/* ---------------- BOX CLICK (UNDO) ---------------- */

boxes.forEach((box, index) => {
	box.addEventListener("click", () => {
		if (index === 5) return; // last box (T) cannot be changed

		const letter = box.textContent;
		if (!letter) return;

		const button = Array.from(letters).find(
			(btn) => btn.textContent === letter
		) as HTMLButtonElement | undefined;

		if (button) {
			button.disabled = false;
		}

		box.textContent = "_";
		box.classList.add("box-placeholder");

		currentIndex = Math.max(0, currentIndex - 1);
	});
});

/* ---------------- SHUFFLE LETTERS ---------------- */

function shuffleLetters() {
	const lettersContainer = document.querySelector(".letters");
	if (!lettersContainer) return;

	const lettersArray = Array.from(lettersContainer.children);

	const shuffled = lettersArray.slice(0, 5).sort(() => Math.random() - 0.5);

	shuffled.forEach((letter) => {
		lettersContainer.appendChild(letter);
	});
}

/* ---------------- CHECK WORD ---------------- */

submitButton?.addEventListener("click", () => {
	checkWord();
});

function checkWord() {
	const message = document.getElementById("message") as HTMLDivElement;
	const messageBox = message.querySelector(".message-box") as HTMLDivElement;

	let word = "";

	boxes.forEach((box) => {
		word += box.textContent?.trim() || "";
	});

	if (word === "SALTET") {

		document.querySelectorAll(".room").forEach((room) => {
			room.classList.add("hidden");
		});

		completeRoom(6, "T");

		stopTimer();
		pauseTotalTimer();

		handleGameWin();

		const completed = document.getElementById("game-completed");
		completed?.classList.remove("hidden");

	} else {
		message.classList.remove("hidden");
		messageBox.textContent = "Fel ord 😭 Försök igen.";
		message.classList.remove("success");
		message.classList.add("error");
	}
}

/* ---------------- INIT ROOM ---------------- */

export function initRoom6() {

	stopTimer();

	loadArtifactsIntoButtons();

	currentIndex = 0;

	intro?.classList.remove("hidden");

	boxes.forEach((box, index) => {
		if (index === 5) {
			box.textContent = "T"; // fixed final letter
			box.classList.remove("box-placeholder");
			box.classList.add("box-fixed");
		} else {
			box.textContent = "_";
			box.classList.add("box-placeholder");
		}
	});

	letters.forEach((btn) => {
		(btn as HTMLButtonElement).disabled = false;
	});

	const message = document.getElementById("message");
	message?.classList.add("hidden");

	if (shuffleInterval !== null) {
		clearInterval(shuffleInterval);
		shuffleInterval = null;
	}
}

/* ---------------- LOAD ARTIFACTS ---------------- */

function loadArtifactsIntoButtons() {
	const letterButtons = document.querySelectorAll(".letter-btn");

	letterButtons.forEach((btn, index) => {
		const artifact = gameState.artifacts[index];

		if (artifact) {
			btn.textContent = artifact;
		}
	});
}