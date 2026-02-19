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
 */