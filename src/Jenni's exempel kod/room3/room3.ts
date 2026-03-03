import "./_room3.scss";
const room3Container: HTMLDivElement | null = document.querySelector("#room3");

export function initRoom3() {
	console.log("Room 3 initialized");

	if (room3Container) {
		room3Container.classList.remove("hidden");
	}

	const completeRoom3Btn: HTMLButtonElement | null =
		document.querySelector("#room3-complete");
	completeRoom3Btn?.addEventListener("click", markRoom3Completed, {
		once: true,
	});
}

function markRoom3Completed() {
	dispatchEvent(new Event("ROOM_3_COMPLETED"));

	room3Container!.classList.add("hidden");
}
