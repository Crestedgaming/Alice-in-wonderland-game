const TOTAL_ROOMS = 6;
// Tracks which room numbers are completed in the current run.
const doneRooms = new Set<number>();
const progressRoot = document.getElementById("progressBar");
const progressFill = document.getElementById("myBar") as HTMLDivElement | null;
// Artifact UI slots in the same order as rooms 1-5.
const artifactSlots = [
	document.getElementById("artefact1"),
	document.getElementById("artefact2"),
	document.getElementById("artefact3"),
	document.getElementById("artefact4"),
	document.getElementById("artefact5"),
];

// Updates artifact slot highlight to reflect completed rooms.
function renderArtifacts(): void {
	artifactSlots.forEach((slot, index) => {
		const roomNumber = index + 1;
		if (doneRooms.has(roomNumber)) {
			slot?.classList.add("is-collected");
		} else {
			slot?.classList.remove("is-collected");
		}
	});
}

// Updates progress bar width and accessibility value.
function renderProgress(): void {
	const completed = doneRooms.size;
	const percent = (completed / TOTAL_ROOMS) * 100;

	if (progressFill) progressFill.style.width = `${percent}%`;
	progressRoot?.setAttribute("aria-valuenow", String(completed));
	renderArtifacts();
}

// Marks one room as completed and refreshes footer UI.
export function finishRoom(room: number): void {
	if (room < 1 || room > TOTAL_ROOMS) return;
	if (doneRooms.has(room)) return;
	doneRooms.add(room);
	renderProgress();
}

// Clears all room progress and resets footer UI.
export function resetRoomProgress(): void {
	doneRooms.clear();
	renderProgress();
}

// Compatibility hook for modules that report completion by room id string.
export function updateFooterContext(roomId: string, completed = false): void {
	if (!completed) {
		return;
	}

	const match = roomId.match(/(\d+)/);
	if (!match) {
		return;
	}

	const roomNumber = Number(match[1]);
	finishRoom(roomNumber);
}

// Expose helper globally for legacy room calls.
if (typeof window !== "undefined") {
	window.updateFooterContext = updateFooterContext;
}

// Initial render keeps footer state consistent on page load.
renderProgress();
