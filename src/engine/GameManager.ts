import { gameState } from "./GameState";
import { finishRoom, resetRoomProgress } from "../footer";

/**
 * Room ID to room element ID mapping for display
 */
const ROOM_MAP: Record<number, string> = {
	1: "room1",
	2: "rum2",
	3: "rum3",
	4: "rum4",
	5: "rum5",
	6: "rum6",
};

const NEXT_BUTTON_MAP: Partial<Record<number, string>> = {
	1: "room1-next",
	2: "room2-next",
	3: "room3-next",
	4: "room4-next",
	5: "room5-next",
};

const TOTAL_ROOMS = 6;

/**
 * Initialize and start the game
 * Resets all game state and begins room 1
 */
export function startGame(): void {
	gameState.isGameActive = true;
	gameState.currentRoom = 1;
	gameState.artifacts = [];
	gameState.score = 0;
	gameState.timer = 0;
	gameState.roomTimes = {};
	gameState.currentRoomStartTime = Date.now();
	resetRoomProgress();

	showRoom(gameState.currentRoom);
	startGlobalTimer();
}

/**
 * Display the specified room by ID
 * Uses the global showRoom function defined in main.ts
 */
function showRoom(roomId: number): void {
	const roomElementId = ROOM_MAP[roomId];
	if (!roomElementId) {
		console.error(`Invalid room ID: ${roomId}`);
		return;
	}
	(window as any).showRoom(roomElementId);
}

/**
 * Mark a room as complete and register the artifact
 * Tracks room completion time and advances to next room
 *
 * @param roomId - The ID of the completed room
 * @param artifactId - The artifact letter/identifier to register
 */
export function completeRoom(roomId: number, artifactId: string): void {
	// Record the time spent in this room
	if (gameState.currentRoomStartTime !== null) {
		const duration = Math.floor(
			(Date.now() - gameState.currentRoomStartTime) / 1000,
		);
		gameState.roomTimes[roomId] = duration;
	}

	// Register artifact and update score
	gameState.artifacts.push(artifactId);
	gameState.score += 100;
	finishRoom(roomId, artifactId);

	const nextRoomId = roomId + 1;

	if (nextRoomId > TOTAL_ROOMS) {
		endGame();
	} else {
		gameState.currentRoom = nextRoomId;

		const nextButtonId = NEXT_BUTTON_MAP[roomId];
		const nextButton = nextButtonId
			? (document.getElementById(nextButtonId) as HTMLButtonElement | null)
			: null;

		if (nextButton) {
			nextButton.classList.remove("hidden");
			nextButton.onclick = () => {
				nextButton.classList.add("hidden");
				gameState.currentRoomStartTime = Date.now();
				showRoom(nextRoomId);
			};
		} else {
			gameState.currentRoomStartTime = Date.now();
			showRoom(nextRoomId);
		}
	}
}

/**
 * Start the global game timer that runs every second
 * Updates the timer display while the game is active
 */
export function startGlobalTimer(): void {
	setInterval(() => {
		if (gameState.isGameActive) {
			gameState.timer++;
			updateTimerDisplay();
		}
	}, 1000);
}

/**
 * Update the timer display on the page
 * Formats time as MM:SS
 */
function updateTimerDisplay(): void {
	const timerEl = document.getElementById("falletTimer");
	if (timerEl) {
		const minutes = Math.floor(gameState.timer / 60);
		const seconds = gameState.timer % 60;
		timerEl.textContent = `Din tid: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	}
}

export function endGame() {
	gameState.isGameActive = false;
	console.log("Game Over!", gameState.roomTimes);
}
