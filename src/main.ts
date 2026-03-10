import "./mainstyles/main.scss";
import "./the_other_rooms/landing_page/home_page";
import "./the_other_rooms/landing_page/login";
import "./the_other_rooms/highscore/highscore";
import "./the_other_rooms/about/_about.scss"
import { initRoom4 } from "./room4/Room4_hide_and_seek";
import { initRoom3 } from "./room3/Room3_the_riddle";
import { initRoom1 } from "./room1/Room1_theFall";
import { initRoom6 } from "./room6/Room6_Slutstriden";
import { initRoom5 } from "./room5/room5_teaparty";
import { initRoom2 } from "./room2/Room2_Storleken";
import { resetRoomProgress } from "./footer";

import { startTotalTimer, pauseTotalTimer, resetTotalTimer, getTotalTime, stopTimer } from "./utils";
import { saveNewHighscore, displayHighscores } from "./the_other_rooms/highscore/highscore";

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
	if (roomId === "rum1") {
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
	const room = roomMap.get(roomId);
	const title = room?.namn || "Escape Room";
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

const goToStartBtn = document.getElementById("goToStartBtn");
if (goToStartBtn) {
	goToStartBtn.addEventListener("click", () => {
		goBackToHome();
	});
}

(window as any).goToStart = function () {
	resetGameUIState();
};

function goBackToHome(): void {
	stopTimer();
	resetRoomProgress();

	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	const homePage = document.getElementById("home-page");
	const start = document.getElementById("start");

	// Go back to home page (start game page)
	homePage?.classList.remove("hidden");
	start?.classList.remove("hidden");
}

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

	// Reset should take the player back to the login page.
	loginPage?.classList.remove("hidden");
	homePage?.classList.add("hidden");
	header?.setAttribute("hidden", "");
	footer?.setAttribute("hidden", "");

	// Keep the room-picker hidden when returning to login.
	start?.classList.add("hidden");
}

/* ============================================================
 * ************************Logik för Vinst**********************
 * ============================================================*/


export function handleGameWin() {
	pauseTotalTimer();
	const finalScore = getTotalTime();
    saveNewHighscore(finalScore);
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});
	
	const completed = document.getElementById("game-completed");
	if (completed) {
		completed.classList.remove("hidden");
	}	
	displayHighscores();
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.id === "show-highscore-from-win") {
        window.showRoom("highscore-page");
    }
});



    
    
