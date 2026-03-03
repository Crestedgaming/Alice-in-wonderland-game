import "./_room2.scss";
const room2Container: HTMLDivElement | null = document.querySelector("#room2");

export function initRoom2() {
	console.log("Room 2 initialized");

	if (room2Container) {
		room2Container.classList.remove("hidden");
	}

	const completeRoom2Btn: HTMLButtonElement | null =
		document.querySelector("#room2-complete");
	completeRoom2Btn?.addEventListener("click", markRoom2Completed, {
		once: true,
	});
}

function markRoom2Completed() {
	dispatchEvent(new Event("ROOM_2_COMPLETED"));

	room2Container!.classList.add("hidden");
}
