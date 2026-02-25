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

// Hämta alla koppar
const cups = document.querySelectorAll<HTMLDivElement>(".cup");

// Hämta total-displayen
const totalDisplay = document.getElementById("total-percent");

// Hämta meddelande-rutan
const messageElement = document.querySelector<HTMLDivElement>(".teaparty__message");

// State – hur mycket te varje kopp har
let cupValues: number[] = [0, 0, 0];

const FILL_AMOUNT = 25;
const TARGET_TOTAL = 125;

// Koppla klick på varje tekanna
cups.forEach((cup) => {
  const button = cup.querySelector<HTMLButtonElement>(".cup__teapot");

  button?.addEventListener("click", () => {
    const index = Number(cup.dataset.cup);
    fillCup(index);
  });
});

// Fyll en kopp
function fillCup(index: number) {
  // Stoppa om koppen redan är full
  if (cupValues[index] >= 100) return;

  cupValues[index] += FILL_AMOUNT;

  updateUI();
  checkGame();
}

// Uppdatera det man ser på skärmen
function updateUI() {
  cups.forEach((cup, index) => {
    const fillElement = cup.querySelector<HTMLDivElement>(".cup__fill");
    const percentText = cup.querySelector<HTMLParagraphElement>(".cup__percent");

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

// Räkna ut totalsumman
function calculateTotal(): number {
  return cupValues.reduce((sum, value) => sum + value, 0);
}

// Kolla om man vunnit eller förlorat
function checkGame() {
  const total = calculateTotal();

  // Kolla om alla koppar har mer än 0
  const allCupsHaveTea = cupValues.every((value) => value > 0);

  if (total === TARGET_TOTAL && allCupsHaveTea) {
    if (messageElement) {
      messageElement.textContent =
        "Grattis! Alla koppar bidrog och du fyllde exakt rätt mängd te! 🎉";
    }
  }

  // Om total är rätt men någon kopp är 0
  else if (total === TARGET_TOTAL && !allCupsHaveTea) {
    if (messageElement) {
      messageElement.textContent =
        "Alla koppar måste få lite te!";
    }
  }

  if (total > TARGET_TOTAL) {
    resetGame();
  }
}

// Återställ spelet
function resetGame() {
  cupValues = [0, 0, 0];

  if (messageElement) {
    messageElement.textContent =
      "Ops, nu rann det över! Börja om och fyll tekopparna igen";
  }

  updateUI();
}

console.log("TEAPARTY LOADED");