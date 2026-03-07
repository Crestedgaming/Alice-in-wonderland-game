import "./mainstyles/main.scss";
import "./room4/Room4_hide_and_seek";
import "./room3/Room3_the_riddle";
import "./room1/Room1_theFall";
import "./room6/Room6_Slutstriden";
import "./room5/room5_teaparty";
import "./room2/Room2_Storleken";

const TOTAL_ROOMS = 6;
const completedRooms = new Set<number>();

function updateProgressUI(): void {
	const progressFill = document.getElementById(
		"myBar",
	) as HTMLDivElement | null;
	const progressRoot = document.getElementById("progressBar");
	const percent = (completedRooms.size / TOTAL_ROOMS) * 100;

	if (progressFill) {
		progressFill.style.width = `${percent}%`;
	}

	progressRoot?.setAttribute("aria-valuenow", String(completedRooms.size));
}

function placeArtifactRandom(letter?: string): void {
	if (!letter) return;

	const artefactsList = document.getElementById("artefactsList");
	if (!artefactsList) return;

	const slots = Array.from(
		artefactsList.querySelectorAll<HTMLSpanElement>("li.artefacts > span"),
	);
	if (slots.length === 0) return;

	const emptySlots = slots.filter((slot) => Boolean(slot.querySelector("img")));
	const slotPool = emptySlots.length > 0 ? emptySlots : slots;
	const randomSlot = slotPool[Math.floor(Math.random() * slotPool.length)];
	randomSlot.textContent = letter;
}

window.completeRoom = (room: number, letter?: string) => {
	if (room < 1 || room > TOTAL_ROOMS) return;
	if (completedRooms.has(room)) return;

	completedRooms.add(room);
	updateProgressUI();
	placeArtifactRandom(letter);
};

// Reusable flow for all room next buttons.
function handleRoomNextButtonClick(nextButton: HTMLButtonElement): void {
	const roomNumber = Number(nextButton.dataset.room);
	const artifactLetter = nextButton.dataset.artifactLetter;
	const nextRoomId = nextButton.dataset.nextRoom;
	const currentRoomId = nextButton.dataset.roomId;

	if (
		typeof window.completeRoom === "function" &&
		Number.isFinite(roomNumber)
	) {
		window.completeRoom(roomNumber, artifactLetter);
	}

	if (
		typeof window.updateFooterContext === "function" &&
		currentRoomId &&
		Number.isFinite(roomNumber)
	) {
		window.updateFooterContext(currentRoomId, true);
	}

	if (typeof window.showRoom === "function" && nextRoomId) {
		window.showRoom(nextRoomId);
	}
}

function registerRoomNextButtonHandler(): void {
	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement | null;
		if (!target) return;

		const nextButton = target.closest(
			".roomNextButton",
		) as HTMLButtonElement | null;
		if (!nextButton) return;

		handleRoomNextButtonClick(nextButton);
	});
}

registerRoomNextButtonHandler();

function focusCurrentViewTarget(viewId: string): void {
	const view = document.getElementById(viewId);
	if (!view) return;

	const heading = view.querySelector("h1, h2") as HTMLElement | null;
	if (heading) {
		heading.setAttribute("tabindex", "-1");
		heading.focus();
		return;
	}

	const firstButton = view.querySelector("button") as HTMLButtonElement | null;
	firstButton?.focus();
}

/*
 * ============================================================
 * ************************Startsida***************************
 * ============================================================*/

(window as any).showRoom = function (roomId: string) {
	document.getElementById("start")!.classList.add("hidden");

	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById(roomId)!.classList.remove("hidden");
	focusCurrentViewTarget(roomId);

	// Initialize Room 1 logic and listeners when showing Room 1
	if (roomId === "room1") {
		if (typeof window.initRoom1 === "function") {
			window.initRoom1();
		}
	}

	if (roomId === "rum3") {
		import("./room3/Room3_the_riddle").then((m) => m.initRoom3());
	}

	// Set navBarTitle to current room's title
	const navTitle = document.getElementById("rumID");
	let title = "";
	switch (roomId) {
		case "room1":
			title = "Fallet";
			break;
		case "rum2":
			title = "Storleken";
			break;
		case "rum3":
			title = "Gåtan";
			break;
		case "rum4":
			title = "Kurragömma";
			break;
		case "rum5":
			title = "Tebjudningen";
			break;
		case "rum6":
			title = "Slutstriden";
			break;
		default:
			title = "Escape Room";
	}

	if (navTitle) {
		navTitle.textContent = title;
	}

	// Set showArtifacts to reflect current room context in footer
	const showArtifacts = document.getElementById("showArtifacts");
	if (showArtifacts) {
		const artifactsLabel = `Artefakter: ${title}`;
		showArtifacts.setAttribute("aria-label", artifactsLabel);
		showArtifacts.setAttribute("data-current-room", roomId);
	}
};

const resetBtn = document.getElementById("resetAndStartGameBtn");
if (resetBtn) {
	resetBtn.addEventListener("click", () => {
		// Full reload is the safest reset because several rooms attach listeners once at module load.
		window.location.reload();
	});
}

(window as any).goToStart = function () {
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById("start")!.classList.remove("hidden");
	focusCurrentViewTarget("start");

	const navTitle = document.getElementById("rumID");
	if (navTitle) {
		navTitle.textContent = "Alice i underlandet";
	}
};

const goToStartBtn = document.getElementById("goToStartBtn");
if (goToStartBtn) {
	goToStartBtn.addEventListener("click", () => {
		if (typeof window.goToStart === "function") {
			window.goToStart();
		}
	});
}
