
import { startTimer, stopTimer ,startTotalTimer, pauseTotalTimer } from "../utils";
import { getCollectedArtifacts } from "../footer";
import { completeRoom } from "../engine/GameManager";

/* Rum 6 är finalen

Här får spelaren fem bokstäver som de har samlat från de tidigare rummen.
Men bokstäverna ligger inte i rätt ordning.

*** Spelarens uppgift är att:

 Titta på bokstäverna
 Tänka efter
 Ordna dem i rätt ordning
 Skriva det korrekta 5-bokstavsordet

 *** Hur det ska kännas

När spelaren kommer in i rummet:

De känner igen bokstäverna.
De inser att det är något ord de måste lista ut.
Det finns en timer som räknar ner.

Efter en viss tid låses en hint upp.
Hinten hjälper spelaren genom att ge en ledtråd om ordet.

Men:

Om spelaren använder hint kan det påverka poängen.
Hinten är en hjälp – men det är fortfarande spelaren som måste tänka

 *** Om spelaren skriver fel ord

Det finns inga extra försök i Rum 6.
Om spelaren bekräftar ett felaktigt ord:

Spelet identifierar vilken bokstav som är fel.
Spelaren skickas tillbaka till det rum där den felaktiga bokstaven hämtades.
De måste lösa det rummet igen för att få rätt bokstav.


*/
let shuffleInterval: number | null = null;
const startBtn = document.getElementById("room6-start-btn");
const intro = document.getElementById("room6-intro");
const roomTimer = document.getElementById("gameTimerEachRoom");


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
const submitButton = document.getElementById("submit");

submitButton?.addEventListener("click", () => {
	checkWord();
	stopTimer();
	pauseTotalTimer();
});

function checkWord() {
	const message = document.getElementById("message") as HTMLDivElement;
	const messageBox = message.querySelector(".message-box") as HTMLDivElement;

	const boxes = document.querySelectorAll(".box");
	let word = "";

	boxes.forEach((box) => {
		word += box.textContent;
	});

	if (word === "SALTET") {
		document.querySelectorAll(".room").forEach((room) => {
			room.classList.add("hidden");
			loadArtifactsIntoButtons();
	completeRoom(6, "T");
		});

		const completed = document.getElementById("game-completed");
		completed?.classList.remove("hidden");
	} else {
		message.classList.remove("hidden");

		messageBox.textContent = "Fel ord 😭 Du måste tillbaka.";
		message.classList.remove("success");
		message.classList.add("error");
	}
}
const boxes = document.querySelectorAll(".box");
const letters = document.querySelectorAll(".letter-btn");

let currentIndex = 0;

letters.forEach((letter) => {
	letter.addEventListener("click", () => {
		if (currentIndex < boxes.length) {
			boxes[currentIndex].textContent = letter.textContent;
			currentIndex++;

			(letter as HTMLButtonElement).disabled = true;
		}
	});
});

function shuffleLetters() {
	const lettersContainer = document.querySelector(".letters");
	if (!lettersContainer) return;

	const lettersArray = Array.from(lettersContainer.children);

	lettersArray.sort(() => Math.random() - 0.5);

	lettersArray.forEach((letter) => {
		lettersContainer.appendChild(letter);
	});
}
export function initRoom6() {

	stopTimer();

	currentIndex = 0;

	const intro = document.getElementById("room6-intro");
	intro?.classList.remove("hidden");

	const boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		box.textContent = "";
	});

	const letters = document.querySelectorAll(".letter-btn");
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

function loadArtifactsIntoButtons() {
	const artifacts = getCollectedArtifacts();
	const letterButtons = document.querySelectorAll(".letter-btn");

	letterButtons.forEach((btn, index) => {
		const letter = artifacts[index];

		if (letter) {
			btn.textContent = letter;
		}
	});
}