export {};

declare global {
	interface Window {
		initRoom1?: () => void;
		showRoom?: (roomId: string) => void;
		goToStart?: () => void;
		selectedKey?: string | null;
		updateFooterContext?: (roomId: string, completed?: boolean) => void;
		markRoomFinished?: (roomId: string | number) => void;
		resetRoomProgress?: () => void;
		completeRoom?: (room: number, letter?: string) => void;
	}
}
