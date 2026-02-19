/**
 * ROOM 3 – Gåtan (The Riddle)
 * 



import { Inventory } from '../engine/Inventory';
import { UIManager } from '../engine/UIManager';
import { ScoreManager } from '../engine/ScoreManager';
import { SaveManager } from '../engine/SaveManager';
import { RoomManager } from '../engine/RoomManager';

export class Room3_Gåtan {
    private inventory: Inventory;
    private uiManager: UIManager;
    private scoreManager: ScoreManager;
    private saveManager: SaveManager;
    private roomManager: RoomManager;

    constructor(
        inventory: Inventory,
        uiManager: UIManager,
        scoreManager: ScoreManager,
        saveManager: SaveManager,
        roomManager: RoomManager
    ) {
        this.inventory = inventory;
        this.uiManager = uiManager;
        this.scoreManager = scoreManager;
        this.saveManager = saveManager;
        this.roomManager = roomManager;
    }

    initialize(): void {
        console.log('Room 3: Gåtan initialized');
        this.uiManager.clearUI();

        // TODO: Add riddle UI and event listeners
        const container = this.uiManager.getContainer();
        container.innerHTML = `
            <div class="room3-container">
                <h1>The Riddle</h1>
                <p>Add your riddle puzzle here</p>
            </div>
        `;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // TODO: Add riddle interaction logic
    }

    cleanup(): void {
        console.log('Room 3: Cleanup');
        // TODO: Remove event listeners, clear timeouts, etc.
    }

    getRoomNumber(): number {
        return 3;
    }

    private completeRoom(): void {
        this.scoreManager.addPoints(100);
        this.roomManager.markRoomCompleted(3);
        this.inventory.addItem('riddle_artifact');
        console.log('Room 3 completed!');
        this.roomManager.nextRoom();
    }
}

 */