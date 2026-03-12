import { startTimer, stopTimer, startTotalTimer, pauseTotalTimer } from "../utils";

/**
 * ============================================================
 * 🎩 ROOM 5 – Hattmakarens Tebjudning
 * ============================================================
 *
 * SYFTE
 * -----
 * Spelaren ska fylla tre tekoppar så att totalsumman blir exakt 125 %.
 * Vid exakt 125 %:
 *    → Rummet klaras
 *    → Bokstav skickas till huvudsystem
 * Vid över 125 %:
 *    → Overflow-animation
 *    → Alla koppar återställs
 *
 * Rummet ansvarar ENDAST för:
 *    - Lokal state
 *    - UI-uppdatering
 *    - Resultatkontroll
 *
 * Timer och poäng hanteras globalt.
 *
 * ============================================================
 * 1. DESIGN & KONCEPT
 * ============================================================
 *
 * - Bestäm increment (ex: +5 % per klick)
 * - Bestäm max per kopp (ex: 100 %)
 * - Definiera overflow-beteende
 * - Definiera success-beteende
 *
 * UI-komponenter:
 * - Rubrik
 * - Total procent-display
 * - Tre koppar
 * - Tre tekannor (klickbara)
 * - Meddelandefält
 *
 * ============================================================
 * 2. GRAFIK & VISUELLT
 * ============================================================
 *
 * - SVG för tekanna
 * - SVG för kopp
 * - Fyllnads-element (styr height i %)
 * - CSS transition för mjuk fyllning
 * - Animation för success
 * - Animation för overflow
 *
 * ============================================================
 * 3. HTML-STRUKTUR
 * ============================================================
 *
 * <section id="room-5">
 *    - Total-display
 *    - Cups-container
 *        - Cup (x3)
 *            - Button (tekanna)
 *            - Cup-visual
 *                - Tea-fill
 *            - Percent-text
 *    - Message-area
 * </section>
 *
 * ============================================================
 * 4. TYPESCRIPT-STRUKTUR
 * ============================================================
 *
 * State:
 * ------
 * type Room5State = {
 *   cups: number[]
 *   target: number
 *   increment: number
 *   isComplete: boolean
 * }
 *
 * Funktioner:
 * ------------
 * init()
 *    - Nollställ state
 *    - Koppla event listeners
 *    - Uppdatera UI
 *
 * fillCup(index: number)
 *    - Öka kopp med increment
 *    - Uppdatera UI
 *    - Kontrollera total
 *
 * getTotal()
 *    - Returnera summan av cups[]
 *
 * checkResult()
 *    - Om total === 125:
 *          → Markera som klar
 *          → Stoppa klick
 *          → stopRoomTimer(5)
 *          → completeRoom(5, "T")
 *
 *    - Om total > 125:
 *          → Visa overflow-animation
 *          → Återställ koppar
 *
 * reset()
 *    - Sätt alla koppar till 0
 *    - Uppdatera UI
 *    - Tillåt klick igen
 *
 * ============================================================
 * 5. INTEGRATION
 * ============================================================
 *
 * Vid start av rummet:
 *    startRoomTimer(5)
 *
 * Vid klarat rum:
 *    stopRoomTimer(5)
 *    completeRoom(5, "T")
 *
 * ============================================================
 * 6. TESTNING
 * ============================================================
 *
 * - Testa exakt 125 %
 * - Testa overflow
 * - Testa snabba klick
 * - Testa reset
 * - Testa omspel
 * - Testa integration med timer
 *
 * ============================================================
 * 7. POLISH (OM TID FINNS)
 * ============================================================
 *
 * - Ljud vid klick
 * - Animation när te hälls
 * - Hattmakaren-skratt vid overflow
 * - Subtil effekt när nära 125 %
 *
 * ============================================================
 */

// ===============================
// RUM 5 – TEAPARTY
// ===============================
import { completeRoom } from "../engine/GameManager";

let gameRunning = false;

// Start-knappen
const startButton = document.getElementById("start-button-teaparty");

startButton?.addEventListener("click", startGame);

function startGame() {
	console.log("TEAPARTY STARTED");

	startTimer("gameTimerEachRoom");
	startTotalTimer("gameTimerTotal");
	gameRunning = true;
	const startScreen = document.getElementById("teaparty-start");
	const content = document.getElementById("teaparty-content");
	if (startScreen) startScreen.classList.add("hidden");
	if (content) content.classList.remove("hidden");
	initGame();
}

function initGame() {
	// Begränsa allt till rum5
	const room = document.getElementById("rum5");
	if (!room) return;

	const cups = room.querySelectorAll<HTMLDivElement>(".cup");
	const totalDisplay = room.querySelector<HTMLSpanElement>("#total-percent");
	const messageElement =
		room.querySelector<HTMLDivElement>(".teaparty__message");

	let cupValues: number[] = [0, 0, 0];

	const FILL_AMOUNT = 25;
	const TARGET_TOTAL = 125;

	cups.forEach((cup) => {
		const button = cup.querySelector<HTMLButtonElement>(".cup__teapot");

		if (button) {
			button.onclick = () => {
				if (!gameRunning) return;

				const index = Number(cup.dataset.cup);

				if (cupValues[index] >= 100) return;

				cupValues[index] += FILL_AMOUNT;

				updateUI();
				checkGame();
			};
		}
	});

	function updateUI() {
		cups.forEach((cup, index) => {
			const fillElement = cup.querySelector<HTMLDivElement>(".cup__fill");
			const percentText =
				cup.querySelector<HTMLParagraphElement>(".cup__percent");

			if (fillElement) {
				fillElement.style.height = cupValues[index] + "%";
			}

			if (percentText) {
				percentText.textContent = cupValues[index] + "%";
			}
		});

		const total = calculateTotal();

		if (totalDisplay) {
			totalDisplay.textContent = total.toString();
		}
	}

	function calculateTotal(): number {
		return cupValues.reduce((sum, value) => sum + value, 0);
	}

	function checkGame() {
		const total = calculateTotal();
		const allCupsHaveTea = cupValues.every((value) => value > 0);

		if (total === TARGET_TOTAL && allCupsHaveTea) {
			stopTimer();
			pauseTotalTimer();
			if (messageElement) {
				messageElement.textContent =
					"Grattis! Alla koppar bidrog och du fyllde exakt rätt mängd te!";
			}
			gameRunning = false;
			completeRoom(5, "A");
		} else if (total === TARGET_TOTAL && !allCupsHaveTea) {
			if (messageElement) {
				messageElement.textContent = "Alla koppar måste få lite te!";
			}
		}

		if (total > TARGET_TOTAL) {
			resetGame();
		}
	}

	function resetGame() {
		cupValues = [0, 0, 0];

		if (messageElement) {
			messageElement.textContent =
				"Ops, nu rann det över! Börja om och fyll tekopparna igen";
		}

		updateUI();
	}
}

export function initRoom5() {
	gameRunning = false;

	const startScreen = document.getElementById("teaparty-start");
	const content = document.getElementById("teaparty-content");
	const totalDisplay = document.getElementById("total-percent");
	const messageElement = document.querySelector(
		"#rum5 .teaparty__message",
	) as HTMLDivElement | null;
	const nextButton = document.getElementById("room5-next");
	const legacyNextButton = document.getElementById("next-room5");
	const fills = document.querySelectorAll<HTMLElement>("#rum5 .cup__fill");
	const percents = document.querySelectorAll<HTMLElement>(
		"#rum5 .cup__percent",
	);

	startScreen?.classList.remove("hidden");
	content?.classList.add("hidden");
	nextButton?.classList.add("hidden");
	legacyNextButton?.classList.add("hidden");

	if (totalDisplay) {
		totalDisplay.textContent = "0";
	}

	if (messageElement) {
		messageElement.textContent = "";
	}

	fills.forEach((fill) => {
		fill.style.height = "0%";
	});

	percents.forEach((percent) => {
		percent.textContent = "0%";
	});
}
