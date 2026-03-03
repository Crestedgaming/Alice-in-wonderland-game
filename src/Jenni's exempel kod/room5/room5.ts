import "./_room5.scss";
const room5Container: HTMLDivElement | null = document.querySelector("#room5");

export function initRoom5() {
	console.log("Room 5 initialized");

	if (room5Container) {
		room5Container.classList.remove("hidden");
	}

	const completeRoom5Btn: HTMLButtonElement | null =
		document.querySelector("#room5-complete");
	completeRoom5Btn?.addEventListener("click", markRoom5Completed, {
		once: true,
	});
}

function markRoom5Completed() {
	dispatchEvent(new Event("ROOM_5_COMPLETED"));

	room5Container!.classList.add("hidden");
}
