export interface GameState {
    currentRoom: number;
    artifacts: string[];
    score: number;
    timer: number; //in seconds
    isGameActive: boolean;
}

export const GameState: GameState = {
    currentRoom: 1,
    artifacts: [],
    score: 0,
    timer: 0,
    isGameActive: false,
};

