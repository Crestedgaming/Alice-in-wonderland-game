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

export function initRoom2() {

const alice = document.querySelector(
  ".storleken-alice"
) as HTMLElement | null;

const mindre = document.querySelector(
  ".storleken-text__mindre"
) as HTMLElement | null;

const successText = document.querySelector(
  ".storleken-success"
) as HTMLElement | null;

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
    console.log("Alice är lagom!");
    successText.classList.remove("hidden");
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
  const vaggord = document.querySelectorAll(".vaggord");

vaggord.forEach((ord) => {
  ord.addEventListener("click", () => {
    (ord as HTMLElement).style.display = "none";

    // kolla hur många som är kvar
    const remaining = document.querySelectorAll(
      ".vaggord:not([style*='display: none'])"
    );

    if (remaining.length === 0 && mindre) {
  mindre.classList.add("pulse");
}
  });
});

// startläge
updateSize();
}