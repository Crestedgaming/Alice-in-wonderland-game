import "./mainstyles/main.scss";
import { startGame } from "./engine/GameManager";
import "./room4/Room4_hide_and_seek";
import "./room3/Room3_the_riddle";
import "./room1/Room1_theFall";
import "./room6/Room6_Slutstriden";
import "./room5/room5_teaparty";
import "./room2/Room2_Storleken";
import { finishRoom } from "./footer";

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

// --- Room reset logic ---
const roomOriginalHTML: Record<string, string> = {};
document.querySelectorAll(".room").forEach((room) => {
	roomOriginalHTML[room.id] = room.innerHTML;
});

function getCurrentRoomId(): string | null {
	const visibleRoom = Array.from(document.querySelectorAll(".room")).find(
		(room) => !room.classList.contains("hidden"),
	);
	return visibleRoom ? visibleRoom.id : null;
}

const resetBtn = document.getElementById("resetAndStartGameBtn");
if (resetBtn) {
	resetBtn.addEventListener("click", () => {
		const currentRoomId = getCurrentRoomId();
		if (currentRoomId && roomOriginalHTML[currentRoomId]) {
			const roomElem = document.getElementById(currentRoomId);
			if (roomElem) {
				roomElem.innerHTML = roomOriginalHTML[currentRoomId];
			}
		}
	});
}

(window as any).goToStart = function () {
	document.querySelectorAll(".room").forEach((room) => {
		room.classList.add("hidden");
	});

	document.getElementById("start")!.classList.remove("hidden");
};

// Progress bar test: only Room 1 is counted for now.
window.markRoomFinished = (roomId: string | number) => {
	if (roomId === "room1" || roomId === 1) {
		finishRoom(1);
	}
};

