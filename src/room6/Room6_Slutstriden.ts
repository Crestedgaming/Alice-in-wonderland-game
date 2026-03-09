// Room 6 timer logic
let room6TimerId: number | null = null;
let room6StartTime = 0;
let room6ElapsedMs = 0;

function updateRoom6TimerDisplay(timerEl: HTMLElement | null, elapsedMs: number) {
	if (!timerEl) return;
	const totalSec = Math.floor(elapsedMs / 1000);
	const min = Math.floor(totalSec / 60);
	const sec = totalSec % 60;
	timerEl.textContent = `Tid i rummet: ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function startRoom6Timer(timerEl: HTMLElement | null) {
	if (room6TimerId !== null) {
		clearInterval(room6TimerId);
	}
	room6StartTime = Date.now();
	room6ElapsedMs = 0;
	updateRoom6TimerDisplay(timerEl, 0);
	room6TimerId = window.setInterval(() => {
		room6ElapsedMs = Date.now() - room6StartTime;
		updateRoom6TimerDisplay(timerEl, room6ElapsedMs);
	}, 250);
}

function stopRoom6Timer(timerEl: HTMLElement | null): number {
	if (room6TimerId !== null) {
		clearInterval(room6TimerId);
		room6TimerId = null;
	}
	if (room6StartTime > 0) {
		room6ElapsedMs = Date.now() - room6StartTime;
	}
	updateRoom6TimerDisplay(timerEl, room6ElapsedMs);
	return room6ElapsedMs;
}
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
const startBtn = document.getElementById("room6-start-btn");
const intro = document.getElementById("room6-intro");
const roomTimer = document.getElementById("gameTimerEachRoom");

startBtn?.addEventListener("click", () => {
	startRoom6Timer(roomTimer);
	intro?.classList.add("hidden");
	shuffleLetters();
	setInterval(shuffleLetters, 3000);
});
const submitButton = document.getElementById("submit");

submitButton?.addEventListener("click", () => {
	checkWord();
	stopRoom6Timer(roomTimer);
});

function checkWord() {
	const message = document.getElementById("message") as HTMLDivElement;
	const messageBox = message.querySelector(".message-box") as HTMLDivElement;

	const boxes = document.querySelectorAll(".box");
	let word = "";

	boxes.forEach((box) => {
		word += box.textContent;
	});

	if (word === "VAKNA") {
		document.querySelectorAll(".room").forEach((room) => {
			room.classList.add("hidden");
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
