// Room 2 timer logic
import { startTimer, stopTimer } from "../utils";



import { completeRoom } from "../engine/GameManager";

/*
 * ============================================================
 * ************************STORLEKEN***************************
 * ============================================================
 * Alice är för stor för att komma in genom dörren.
 * Spelaren måste manipulera hennes storlek genom att klicka
 * på orden i texten.
 *
 * De stora orden på väggen är visuella och försvinner vid klick.
 *
 * ============================================================
 * *********************1. SPELLOGIK***************************
 * ============================================================
 *
 * Startvärde:
 *   sizeLevel = 2
 *
 * Nivåer:
 *   3 = JÄTTESTOR
 *   2 = FÖR STOR (start)
 *   1 = NÄSTAN LAGOM
 *   0 = LAGOM (klar)
 *
 * Klick på "stor":
 *   → sizeLevel++
 *   → Uppdatera text
 *   → Maxgräns: 3
 *
 * Klick på "mindre":
 *   → sizeLevel--
 *   → Uppdatera text
 *   → Mingräns: 0
 *
 * När sizeLevel === 0:
 *   → Visa "Alice är lagom stor!"
 *   → Stoppa klick
 *   → stopRoomTimer(2)
 *   → completeRoom(2, "<DIN BOKSTAV>")
 *
 * ============================================================
 * ***************2. MISLEADING-ORD (VÄGGORD)******************
 * ============================================================
 *
 * Orden:
 *   - MINDRE
 *   - STOR
 *   - LITEN
 *   - STÖRRE
 *
 * Vid klick:
 *   → Försvinner (opacity 0 eller display none)
 *   → Påverkar INTE sizeLevel
 *
 * ============================================================
 * ******************3. UI-UPPDATERING*************************
 * ============================================================
 *
 * updateUI():
 *
 *   Om sizeLevel === 3:
 *     → Text: "Alice är JÄTTESTOR!"
 *
 *   Om sizeLevel === 2:
 *     → Text: "Alice är för stor."
 *
 *   Om sizeLevel === 1:
 *     → Text: "Alice är nästan lagom..."
 *
 *   Om sizeLevel === 0:
 *     → Text: "Alice är lagom stor!"
 *     → Dörr får klass "open"
 *
 * ============================================================
 * *******************4. INTEGRATION***************************
 * ============================================================
 *
 * Vid start:
 *   startRoomTimer(2)
 *
 * Vid klar:
 *   stopRoomTimer(2)
 *   completeRoom(2, "<DIN BOKSTAV>")
 *
 * ============================================================
 * *********************5. TESTNING****************************
 * ============================================================
 *
 * - Testa klick på "stor" flera gånger (maxgräns fungerar)
 * - Testa klick på "mindre" ned till 0
 * - Testa att väggen-orden försvinner
 * - Testa att rummet inte kan klaras två gånger
 * - Testa integration med timer
 *
 * ============================================================
 *  * ============================
 * HTML-SKISS – RUM 2
 * ============================
 *
 */

// start knapp
const room2StartButton = document.querySelector<HTMLButtonElement>(
	"#room2-start-button",
);
const overlay = document.getElementById("room2-overlay");

room2StartButton?.addEventListener("click", () => {
	startTimer("gameTimerEachRoom");
	// göm overlay + start-knappen
	overlay?.classList.add("hidden");
	room2StartButton.classList.add("hidden");
});

/* =========================
   RUM 2 - DIN LOGIK
   ========================= */

const alice = document.querySelector(".size-alice") as HTMLElement | null;

const mindre = document.querySelector(
	".size-text__smaller",
) as HTMLElement | null;

const successText = document.querySelector(
	".size-success",
) as HTMLElement | null;
let room2Completed = false;

// 3 = jättestor, 0 = lagom
let sizeLevel = 3;
let step = 0;

function updateSize() {
	if (!alice || !successText) return;

	// göm success-text som standard
	successText.classList.add("hidden");

	let height = 90;

	if (sizeLevel === 3) height = 95;
	if (sizeLevel === 2) height = 75;
	if (sizeLevel === 1) height = 65;
	if (sizeLevel === 0) height = 45;

	const offset = 10 + step * 12;

	alice.style.height = `${height}vh`;
	alice.style.left = `${offset}vw`;

	if (sizeLevel === 0) {
	stopTimer();
		console.log("Alice är lagom!");
		successText.classList.remove("hidden");
		if (!room2Completed) {
			room2Completed = true;
			completeRoom(2, "A");
		}
	}
}

// klick på ordet "mindre"
if (mindre) {
	mindre.addEventListener("click", () => {
		if (sizeLevel > 0) {
			sizeLevel--;
			step++;
			updateSize();
		}
	});
}

// väggord försvinner när man klickar
const vaggord = document.querySelectorAll(".wall-word");

vaggord.forEach((ord) => {
	ord.addEventListener("click", () => {
		(ord as HTMLElement).style.display = "none";

		// kolla hur många som är kvar
		const remaining = document.querySelectorAll(
			".wall-word:not([style*='display: none'])",
		);

		if (remaining.length === 0 && mindre) {
			mindre.classList.add("pulse");
		}
	});
});

// startläge
updateSize();

export function initRoom2() {
	room2Completed = false;
	sizeLevel = 3;
	step = 0;
	overlay?.classList.remove("hidden");
	room2StartButton?.classList.remove("hidden");
	const nextButton = document.getElementById("room2-next");
	nextButton?.classList.add("hidden");
	updateSize();
}

export {};
