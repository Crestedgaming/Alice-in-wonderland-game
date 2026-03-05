const TOTAL_ROOMS = 6;
const doneRooms = new Set<number>();
const progressRoot = document.getElementById("progressBar");
const progressFill = document.getElementById("myBar") as HTMLDivElement | null;

function renderProgress(): void {
	const completed = doneRooms.size;
	const percent = (completed / TOTAL_ROOMS) * 100;

	if (progressFill) progressFill.style.width = `${percent}%`;
	progressRoot?.setAttribute("aria-valuenow", String(completed));
}

export function finishRoom(room: number): void {
	if (room < 1 || room > TOTAL_ROOMS) return;
	if (doneRooms.has(room)) return;
	doneRooms.add(room);
	renderProgress();
}

export function resetRoomProgress(): void {
	doneRooms.clear();
	renderProgress();
}
