import { gameState } from "./GameState";
import { renderRoom } from "./UIManager";

export function startGame() {
    gameState.isGameActive = true;
    gameState.currentRoom = 1;
    gameState.artifacts = [];
    gameState.score = 0;
    gameState.timer = 0;
    renderRoom(gameState.currentRoom);
    startGlobalTimer();

    // Add any additional initialization logic here (e.g., load assets, set up event listeners)
}

export function completeRoom(roomId: number, letter: string) {
    gameState.artifacts.push(letter);
    gameState.score += 100; // Example scoring logic, can be adjusted based on room difficulty
    gameState.currentRoom = roomId + 1;
    if (gameState.currentRoom > 6) {
        endGame();
    } else {
        renderRoom(gameState.currentRoom);
    }
}

export function startGlobalTimer() {
    setInterval(() => {
        if (gameState.isGameActive) {
            gameState.timer++;
            // Update timer display if needed
        }
    }, 1000);
}

export function endGame() {
    gameState.isGameActive = false;
    // Show final score and collected artifacts
    const app = document.getElementById("app")!;
    app.innerHTML = `
        <h1>Game Over</h1>
        <p>Your Score: ${gameState.score}</p>
        <p>Artifacts Collected: ${gameState.artifacts.join(", ")}</p>
        <button id="restart">Restart Game</button>
    `;
}