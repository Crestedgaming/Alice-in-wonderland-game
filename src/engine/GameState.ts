export interface Artifact {
    id: string;
    name: string;
    collected: boolean;
}

export class GameState {
    // --- Time ---
    timeTaken: number = 0; //seconds since game start
    gameFinished: boolean = false;


    //--- Rooms --- 
    currentRoom: number = 0;
    roomsCompleted: number = 0;
    totalRooms: number = 6;

    //--- Artifacts ---
    artifacts: Artifact[] = [];

    constructor() { }

    get collectedArtifacts(): number {
        return this.artifacts.filter(a => a.collected).length;
    }

    get progressPercent(): number {
        return Math.floor((this.roomsCompleted / this.totalRooms) * 100);
    }

}