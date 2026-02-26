/**
 * Game State Interface
 * Tracks all global game data including room progression, artifacts, scoring, and timing
 */
export interface GameState {
    /** Current room number (1-6) */
    currentRoom: number;

    /** Array of artifact IDs collected by the player */
    artifacts: string[];

    /** Player's total score */
    score: number;

    /** Total elapsed time in seconds */
    timer: number;

    /** Whether the game is currently active */
    isGameActive: boolean;

    /** Time spent in each room (in seconds) mapped by room ID */
    roomTimes: Record<number, number>;

    /** Timestamp when the current room started */
    currentRoomStartTime: number | null;
}

/**
 * Global game state instance
 * All room modules should read from and write to this object
 */
export const gameState: GameState = {
    currentRoom: 1,
    artifacts: [],
    score: 0,
    timer: 0,
    isGameActive: false,
    roomTimes: {},
    currentRoomStartTime: null,
};

