import "../mainstyles/main.scss";

let currentRiddle = 0;

const riddles = [
   {
      element: document.getElementById("riddle1") as HTMLDivElement,
      answer: "människan"
   },
   {
      element: document.getElementById("riddle2") as HTMLDivElement,
      answer: "solen"
   },
   {
      element: document.getElementById("riddle3") as HTMLDivElement,
      answer: "dammråtta"
   }
];

export function initRoom3(): void {
   rum3StartButton.addEventListener("click", startRiddle);

   document.getElementById("submit1")!.addEventListener("click", checkAnswer);
   document.getElementById("submit2")!.addEventListener("click", checkAnswer);
   document.getElementById("submit3")!.addEventListener("click", checkAnswer);
}

function startRiddle(): void {
   rum3StartButton.classList.add("hidden");
   riddleConttainer.classList.remove("hidden");

   showRiddle(0);
}

function showRiddle(index: number): void {
   riddles.forEach(r => r.element.classList.add("hidden"));
   riddles[index].element.classList.remove("hidden");
}

function checkAnswer(): void {
   const input = riddles[currentRiddle].element.querySelector("input") as HTMLInputElement;
   const userAnswer = input.value.trim().toLowerCase();

   if (userAnswer === riddles[currentRiddle].answer) {
      currentRiddle++;

      if (currentRiddle < riddles.length) {
         showRiddle(currentRiddle);
      } else {
         finishRoom3();
      }
   } else {
      alert("Fel svar!");
   }
}

function finishRoom3(): void {
   riddleContainer.innerHTML = "<h3>Du klarade alla gåtor! 🎉</h3>";
}





/**
 * Spelaren kommer ut på en stor äng med blommor och svampa, men något är inte som det ska vara,
 * allt är mycket större än vanligt.
 *
 * På en av det större svamparna ser spelaren en stor fet larv.
 *
 * Spelaren trycker på "starta"

 START

 * Spelaren behöver svara rätt på 3 gåtor som larven ger spelaren för att kunna gå vidare och avsluta rummet samt att det får en artifact som behövs för det sista pusslet.

 * När spelaren klickar på "starta" så tas classen hidden bort från kod-blocket och den första gåtan visas på skärmen.
    * När spelaren har svarat på den första gåtan så visas den andra gåtan på skärmen.
    * När spelaren har svarat på den andra gåtan så visas den tredje gåtan på skärmen.
    * När spelaren har svarat på den tredje gåtan så visas en text som säger att spelaren har klarat rummet och att den får en artifact (spelaren ska kunna få en felaktigt artifact).
    * När spelaren har klarat rummet så kan den klicka på "nästa" för att gå vidare till nästa rum.
    *
    *
    * start() {
    *   const app = document.getElementById("app")!;
    *  app.innerHTML = `
    *      <h1>Puzzle</h1>
    *      <button id="solve">Solve</button>
    *  `;
    * //if (svaret är rätt) {
    //  visa nästa gåta a
    //} else {
    //  visa att svaret är fel och att spelaren måste försöka igen
    //}
 */
//}
