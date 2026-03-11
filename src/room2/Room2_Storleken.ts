// Room 2 timer logic
import { startTimer, stopTimer, startTotalTimer, pauseTotalTimer } from "../utils";



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
  "#room2-start-button"
);
const overlay = document.getElementById("room2-overlay");

/* =========================
   STARTKNAPP
   ========================= */

room2StartButton?.addEventListener("click", () => {
  startTimer("gameTimerEachRoom");
  startTotalTimer("gameTimerTotal");
  overlay?.classList.add("hidden");
  room2StartButton.classList.add("hidden");
});

/* =========================
   RUM 2 - LOGIK
   ========================= */

const alice = document.querySelector<HTMLElement>(".size-alice");
const mindre = document.querySelector<HTMLElement>(".size-text__smaller");
const successText = document.querySelector<HTMLElement>(".size-success");
const vaggord = document.querySelectorAll<HTMLElement>(".wall-word");

let room2Completed = false;

// 3 = jättestor, 0 = lagom
let sizeLevel = 3;
let step = 0;

function updateSize() {
  if (!alice || !successText) return;

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
    pauseTotalTimer();
    console.log("Alice är lagom!");
    successText.classList.remove("hidden");

    if (!room2Completed) {
      room2Completed = true;
      completeRoom(2, "A");
    }
  }
}

function makeAliceSmaller() {
  if (sizeLevel > 0) {
    sizeLevel--;
    step++;
    updateSize();
  }
}

function handleKeyboardActivate(
  event: KeyboardEvent,
  callback: () => void
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
}

// klick + tangentbord på ordet "mindre"
if (mindre) {
  mindre.addEventListener("click", makeAliceSmaller);

  mindre.addEventListener("keydown", (event: KeyboardEvent) => {
    handleKeyboardActivate(event, makeAliceSmaller);
  });
}

// väggord försvinner när man klickar eller trycker Enter/Space
vaggord.forEach((ord) => {
  const hideWord = () => {
    ord.style.display = "none";

    const remaining = document.querySelectorAll(
      ".wall-word:not([style*='display: none'])"
    );

    if (remaining.length === 0 && mindre) {
      mindre.classList.add("pulse");
      mindre.focus();
    }
  };

  ord.addEventListener("click", hideWord);

  ord.addEventListener("keydown", (event: KeyboardEvent) => {
    handleKeyboardActivate(event, hideWord);
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

  // visa väggorden igen när rummet startas om
  vaggord.forEach((ord) => {
    ord.style.display = "";
  });

  if (mindre) {
    mindre.classList.remove("pulse");
  }

  updateSize();
}

export {};
