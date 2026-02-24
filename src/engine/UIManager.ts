import { GameState } from "./GameState";

export async function renderRoom(roomId: number) {
    const app = document.getElementById("app") as HTMLElement;
    try {
        const roomModule = await import(`../room${roomId}/Room${roomId}`);