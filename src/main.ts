import "./mainstyles/main.scss";
import "./the_other_rooms/landing_page/home_page";
import "./the_other_rooms/landing_page/login";
import "./room4/Room4_hide_and_seek";
import "./room3/Room3_the_riddle";
import "./room1/Room1_theFall";
import "./room6/Room6_Slutstriden";
import "./room5/room5_teaparty";
import "./room2/Room2_Storleken";

/*
 * ============================================================
 * ************************Startsida***************************
 * ============================================================*/

interface CustomWindow extends Window {
	showRoom: (roomId: string) => void;
}

declare const window: CustomWindow;

window.showRoom = function (roomId: string) {
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById(roomId)!.classList.remove("hidden");
	focusCurrentViewTarget(roomId);

	// Initialize Room logic and listeners when showing specific rooms
	if (roomId === "room1") {
		if (typeof window.initRoom1 === "function") {
			window.initRoom1();
		}
	}
	if (roomId === "rum3") {
		import("./room3/Room3_the_riddle").then((m) => m.initRoom3());
	}
	if (roomId === "rum2") {
		import("./room2/Room2_Storleken").then((m) => m.initRoom2());
	}
	if (roomId === "rum4") {
		import("./room4/Room4_hide_and_seek").then((m) => m.initRoom4());
	}
	if (roomId === "rum5") {
		import("./room5/room5_teaparty").then((m) => m.initRoom5());
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
		resetGameUIState();
		if (typeof window.goToStart === "function") {
			window.goToStart();
		}
	});
}

(window as any).goToStart = function () {
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById("start")!.classList.remove("hidden");
};

function focusCurrentViewTarget(roomId: string): void {
	const room = document.getElementById(roomId);
	if (!room) {
		return;
	}

	const firstButton = room.querySelector("button") as HTMLButtonElement | null;
	firstButton?.focus();
}

function resetGameUIState(): void {
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	const start = document.getElementById("start");
	start?.classList.remove("hidden");
}
