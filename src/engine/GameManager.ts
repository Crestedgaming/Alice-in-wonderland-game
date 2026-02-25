import { gameState } from './GameState';

export function startGame() {
    gameState.isGameActive = true;
    gameState.currentRoom = 1;
    gameState.artifacts = [];
    gameState.score = 0;
    gameState.timer = 0;
    gameState.roomTimes = {};
    gameState.currentRoomStartTime = Date.now();
    showRoom(gameState.currentRoom);
    startGlobalTimer();
}

function showRoom(roomId: number) {
    const roomMap: Record<number, string> = {
        1: 'rum1',
        2: 'rum2',
        3: 'rum3',
        4: 'rum4',
        5: 'rum5',
        6: 'rum6',
    };
    (window as any).showRoom(roomMap[roomId]);
}

export function completeRoom(roomId: number, letter: string) {
    if (gameState.currentRoomStartTime !== null) {
        const duration = Math.floor((Date.now() - gameState.currentRoomStartTime) / 1000);
        gameState.roomTimes[roomId] = duration;
    }
    gameState.artifacts.push(letter);
    gameState.score += 100;
    gameState.currentRoom = roomId + 1;
    if (gameState.currentRoom > 6) {
        endGame();
    } else {
        gameState.currentRoomStartTime = Date.now();
        showRoom(gameState.currentRoom);
    }
}

export function startGlobalTimer() {
    setInterval(() => {
        if (gameState.isGameActive) {
            gameState.timer++;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('falletTimer');
    if (timerEl) {
        const minutes = Math.floor(gameState.timer / 60);
        const seconds = gameState.timer % 60;
        timerEl.textContent = `Din tid: ${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}`;
    }
}

export function endGame() {
    gameState.isGameActive = false;
    console.log('Game Over!', gameState.roomTimes);
}