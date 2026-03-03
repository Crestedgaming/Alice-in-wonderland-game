import "./_room1.scss";
const room1Container: HTMLDivElement | null = document.querySelector("#room1");

/**
 * This function will display room 1 when called.
 *
 * It will also set up the room with proper
 * event listeners for buttons, etc. and display the room.
 */
export function initRoom1() {
	if (!room1Container) {
		console.error("Room 1 HTML container missing. Canceling.");

		return;
	}

	console.log("Room 1 initialized");

	if (room1Container) {
		room1Container.classList.remove("hidden");
	}

	const completeRoom1Btn: HTMLButtonElement | null =
		document.querySelector("#room1-complete");
	completeRoom1Btn?.addEventListener("click", markRoom1Completed, {
		once: true,
	});
}

/**
 * This function dispatches an event to mark the room as completed.
 *
 * It is also responsible for hiding the room altogether when the
 * room is done.
 */
function markRoom1Completed() {
	dispatchEvent(new Event("ROOM_1_COMPLETED"));

	room1Container!.classList.add("hidden");
}
