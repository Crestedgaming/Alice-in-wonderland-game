import { startTimer, stopTimer, startTotalTimer, pauseTotalTimer } from "../utils";
import { handleGameWin } from "../main";
import { gameState } from "../engine/GameState";

const startBtn = document.getElementById("room6-start-btn");
const intro = document.getElementById("room6-intro");
const submitButton = document.getElementById("submit");

const boxes = document.querySelectorAll(".box");
const letters = document.querySelectorAll(".letter-btn");

let currentIndex = 0;

startBtn?.addEventListener("click", () => {
	startTimer("gameTimerEachRoom");
	startTotalTimer("gameTimerTotal");
	intro?.classList.add("hidden");
	shuffleLetters();
});

letters.forEach((letter, index) => {
	letter.addEventListener("click", () => {
		const btn = letter as HTMLButtonElement;

		if (currentIndex < boxes.length && btn.textContent) {

			const box = boxes[currentIndex] as HTMLElement;

			box.textContent = btn.textContent;
			box.classList.remove("box-placeholder");

			
			box.setAttribute("data-letter-index", index.toString());

			currentIndex++;
			btn.disabled = true;
		}
	});
});

boxes.forEach((box) => {
	box.addEventListener("click", () => {

		const index = box.getAttribute("data-letter-index");
		if (index === null) return;

		const button = letters[Number(index)] as HTMLButtonElement;

		button.disabled = false;

		box.textContent = "_";
		box.classList.add("box-placeholder");
		box.removeAttribute("data-letter-index");

		currentIndex = Math.max(0, currentIndex - 1);
	});
});
function shuffleLetters() {
	const lettersContainer = document.querySelector(".letters");
	if (!lettersContainer) return;

	const lettersArray = Array.from(lettersContainer.children);
	const shuffled = lettersArray.sort(() => Math.random() - 0.5);

	shuffled.forEach((letter) => {
		lettersContainer.appendChild(letter);
	});
}

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

	if (word === "VAKNA") {

		document.querySelectorAll(".room").forEach((room) => {
			room.classList.add("hidden");
		});

		stopTimer();
		pauseTotalTimer();
		handleGameWin();

		const completed = document.getElementById("game-completed");
		completed?.classList.remove("hidden");

	} else {
		message.classList.remove("hidden");
		messageBox.innerHTML = "";
stopTimer();
		pauseTotalTimer();
		const errorText = document.createElement("p");
		errorText.textContent = "Fel ord 😭 Försök igen.";
		messageBox.appendChild(errorText);
		const errorTextH3 = document.createElement("h3");
		errorTextH3.textContent = "Testa rum 1 eller rum 3, eller båda, för att få rätt artefakt.";
		messageBox.appendChild(errorTextH3);

		const returnHomeBtn = document.createElement("button");
		returnHomeBtn.textContent = "Återgå till start";
		messageBox.appendChild(returnHomeBtn);

		returnHomeBtn.addEventListener("click", () => {
			window.showRoom("rum1");
		});
	}
}

export function initRoom6() {

	stopTimer();

	currentIndex = 0;

	intro?.classList.remove("hidden");

	boxes.forEach((box) => {
		box.textContent = "_";
		box.classList.add("box-placeholder");
	});

	letters.forEach((btn, index) => {
		const artifact = gameState.artifacts[index];
		if (artifact) btn.textContent = artifact;
		(btn as HTMLButtonElement).disabled = false;
	});

	const message = document.getElementById("message");
	message?.classList.add("hidden");
}