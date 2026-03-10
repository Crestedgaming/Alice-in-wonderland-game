import "./mainstyles/main.scss";
import "./the_other_rooms/landing_page/home_page";
import "./the_other_rooms/landing_page/login";
import { initRoom4 } from "./room4/Room4_hide_and_seek";
import { initRoom3 } from "./room3/Room3_the_riddle";
import { initRoom1 } from "./room1/Room1_theFall";
import { initRoom6 	} from "./room6/Room6_Slutstriden";	
import { initRoom5 } from "./room5/room5_teaparty";
import { initRoom2 } from "./room2/Room2_Storleken";
import { resetRoomProgress } from "./footer";
import { stopTimer, resetTotalTimer } from "./utils";

/*
 * ============================================================
 * ************************Startsida***************************
 * ============================================================*/

interface CustomWindow extends Window {
	showRoom: (roomId: string) => void;
}

declare const window: CustomWindow;

window.showRoom = function (roomId: string) {

		stopTimer();
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById(roomId)!.classList.remove("hidden");
	focusCurrentViewTarget(roomId);

	// Initialize Room logic and listeners when showing specific rooms
	if (roomId === "room1") {
		initRoom1();
	}
	if (roomId === "rum3") {
		initRoom3();
	}
	if (roomId === "rum2") {
		initRoom2();
	}
	if (roomId === "rum4") {
		initRoom4();
	}
	if (roomId === "rum5") {
		initRoom5();
	}
	if (roomId === "rum6") {
	initRoom6();
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
	resetGameUIState();
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
	stopTimer();
	resetTotalTimer();
	resetRoomProgress();

	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	const loginPage = document.getElementById("login-page");
	const homePage = document.getElementById("home-page");
	const start = document.getElementById("start");
	const header = document.querySelector("header");
	const footer = document.querySelector("footer");

	// Reset should take the player to the real start page menu.
	loginPage?.classList.add("hidden");
	homePage?.classList.remove("hidden");
	header?.removeAttribute("hidden");
	footer?.removeAttribute("hidden");

	// Keep the room-picker hidden when returning to start page.
	start?.classList.add("hidden");
}
