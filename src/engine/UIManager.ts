import { GameState } from './GameState';

export async function renderRoom(roomId: number) {
    const app = document.getElementById('app') as HTMLElement;
    try {
        const roomModule = await import(`./room${roomId}/Room${roomId}_${getRoomName(roomId)}.ts`);
        roomModule.renderRoom$; { roomId } (); // Assumes each room exports a render function
    } catch (error) {
        app.innerHTML = `<p>Error loading room ${roomId}.</p>`;
    }
}

function getRoomName(roomId: number): string {
    const names = {
        1: 'Fallet',
        2: 'Storleken',
        3: 'Gåtan',
        4: 'Kurragömma', // Adjust based on actual names
        5: 'Tebjudningen',
        6: 'Slutstriden',
    };
    return names[roomId as keyof typeof names] || 'Unknown';
}

export function updateUI() {
    // Update global UI elements, e.g., artifacts display, score, timer
    const artifactsEl = document.getElementById('visaArtefakter');
    if (artifactsEl) {
        artifactsEl.innerHTML = GameState.artifacts.map(a => `<li>${a}</li>`).join('');
    }
    // Add more UI updates as needed
}