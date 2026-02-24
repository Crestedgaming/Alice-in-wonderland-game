


export class Room3 {

    start() {
        const app = document.getElementById("app")!;

        app.innerHTML = `
            <h1>Puzzle</h1>
            <button id="solve">Solve</button>
        `;

        document.getElementById("solve")!
            .addEventListener("click", () => this.finish());
    }

    finish() {
        GameState.artifacts.push("artifact3");
        GameState.score += 100;

        completeRoom();
    }
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
    * När spelaren har svarat på den tredje gåtan så visas en text som säger att spelaren har klarat rummet och att den får en artifact.
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
    //  visa nästa gåta
    //} else {
    //  visa att svaret är fel och att spelaren måste försöka igen
    //}
 */
//}
