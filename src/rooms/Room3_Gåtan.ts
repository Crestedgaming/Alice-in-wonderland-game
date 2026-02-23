import { GameState } from "../engine/GameState";
import { completeRoom } from "../engine/GameManager";


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
 * (Monolog)
 * -Larven: "vem är du"