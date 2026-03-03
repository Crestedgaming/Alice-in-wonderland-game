import "./_room6.scss";
const room6Container: HTMLDivElement | null = document.querySelector("#room6");

export function initRoom6() {
	console.log("Room 6 initialized");

	if (room6Container) {
		room6Container.classList.remove("hidden");
	}

	const completeRoom6Btn: HTMLButtonElement | null =
		document.querySelector("#room6-complete");
	completeRoom6Btn?.addEventListener("click", markRoom6Completed, {
		once: true,
	});
}

function markRoom6Completed() {
	dispatchEvent(new Event("ROOM_6_COMPLETED"));

	room6Container!.classList.add("hidden");
}
