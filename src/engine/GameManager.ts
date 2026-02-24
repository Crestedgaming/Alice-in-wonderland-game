import { GameState } from "./GameState";
import { renderRoom } from "./UIManager";

export function startGame() {
    GameState.isGameActive = true;
    GameState.currentRoom = 1;
    GameState.artifacts = [];
    GameState.score = 0;
    GameState.timer = 0;
    renderRoom(GameState.currentRoom);
    startGlobalTimer();

    // Add any additional initialization logic here (e.g., load assets, set up event listeners)
}

export function completeRoom(roomId: number, letter: string) {
    GameState.artifacts.push(letter);
    GameState.score += 100; // Example scoring logic, can be adjusted based on room difficulty
    GameState.currentRoom = roomId + 1;
    if (GameState.currentRoom > 6) {
        endGame();
    } else {
        renderRoom(GameState.currentRoom);
    }
}

export function startGlobalTimer() {
    setInterval(() => {
        if (GameState.isGameActive) {
            GameState.timer++;
            // Update timer display if needed
        }
    }, 1000);
}

export function endGame() {
    GameState.isGameActive = false;
    // Show final score and collected artifacts
    const app = document.getElementById("app")!;
    app.innerHTML = `
        <h1>Game Over</h1>
        <p>Your Score: ${GameState.score}</p>
        <p>Artifacts Collected: ${GameState.artifacts.join(", ")}</p>
        <button id="restart">Restart Game</button>
    `;
}