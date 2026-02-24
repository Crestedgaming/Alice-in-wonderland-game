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

export function renderRoom6() {
  const app = document.getElementById("app") as HTMLDivElement;

  app.innerHTML = `
    <div class="room--final">
      <h1>Room 6 - Word Puzzle</h1>

      <div class="puzzle">
        <input type="text" maxlength="1" class="letter" />
        <input type="text" maxlength="1" class="letter" />
        <input type="text" maxlength="1" class="letter" />
        <input type="text" maxlength="1" class="letter" />
        <input type="text" maxlength="1" class="letter" />
      </div>

      <button class="hint-button" disabled>Hint</button>
         <button class="submit" id="submit">Submit</button>

      <p id="message" class="message"></p>
    </div>
  `;
  const submitButton = document.getElementById("submit");

submitButton?.addEventListener("click", checkWord);



function checkWord() {
  const message = document.querySelector(".message") as HTMLParagraphElement;
  const inputs = document.querySelectorAll(".letter");

  let word = "";

  inputs.forEach((input) => {
    word += (input as HTMLInputElement).value;
  });

  if (word === "VAKNA") {
    message.textContent = "Grattis! Du klarade det!";
    message.classList.remove("error");
    message.classList.add("success");
  } else {
    message.textContent = "Fel ord! Du måste tillbaka.";
    message.classList.remove("success");
    message.classList.add("error");
  }
}

const inputs = document.querySelectorAll(".letter");

inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
  const keyEvent = event as KeyboardEvent;

  if (keyEvent.key === "Enter") {
    checkWord();
  }
});
});
}
