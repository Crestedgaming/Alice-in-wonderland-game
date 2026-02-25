export interface GameState {
    currentRoom: number;
    artifacts: string[];
    score: number;
    timer: number; //in seconds
    isGameActive: boolean;
    roomTimes: Record<number, number>;
    currentRoomStartTime: number | null;
}

export const gameState: GameState = {
    currentRoom: 1,
    artifacts: [],
    score: 0,
    timer: 0,
    isGameActive: false,
    roomTimes: {},
    currentRoomStartTime: null,
};

