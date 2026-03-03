import "./_room4.scss";
const room4Container: HTMLDivElement | null = document.querySelector("#room4");

export function initRoom4() {
	console.log("Room 4 initialized");

	if (room4Container) {
		room4Container.classList.remove("hidden");
	}

	const completeRoom4Btn: HTMLButtonElement | null =
		document.querySelector("#room4-complete");
	completeRoom4Btn?.addEventListener("click", markRoom4Completed, {
		once: true,
	});
}

function markRoom4Completed() {
	dispatchEvent(new Event("ROOM_4_COMPLETED"));

	room4Container!.classList.add("hidden");
}
