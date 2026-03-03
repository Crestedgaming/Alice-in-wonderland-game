import "./mainstyles/main.scss";
import { startGame } from "./engine/GameManager";

import "./room4/Room4_hide_and_seek";
import "./room3/Room3_the_riddle";
import "./room1/Room1_Fallet";
import "./room6/Room6_Slutstriden";
import "./room5/room5_teaparty";
import "./room2/Room2_Storleken";



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

	// ✅ Initialize correct room when shown
	switch (roomId) {
		case "room1":
			initRoom1();
			break;
		case "room2":
			initRoom2();
			break;
		case "room3":
			initRoom3();
			break;
		case "room4":
			initRoom4();
			break;
		case "room5":
			initRoom5();
			break;
		case "room6":
			initRoom6();
			break;
	}

	// Set navBarTitle
	const navTitle = document.getElementById("rumID");
	if (navTitle) {
		let title = "";
		switch (roomId) {
			case "room1":
				title = "Fallet";
				break;
			case "room2":
				title = "Storleken";
				break;
			case "room3":
				title = "Gåtan";
				break;
			case "room4":
				title = "Kurragömma";
				break;
			case "room5":
				title = "Tebjudningen";
				break;
			case "room6":
				title = "Slutstriden";
				break;
			default:
				title = "Escape Room";
		}
		navTitle.textContent = title;
	}
};



// Set navBarTitle to current room's title
const navTitle = document.getElementById("rumID");
if (navTitle) {
	let title = "";
	switch (roomId) {
		case "room1":
			title = "Fallet";
			break;
		case "room2":
			title = "Storleken";
			break;
		case "room3":
			title = "Gåtan";
			break;
		case "room4":
			title = "Kurragömma";
			break;
		case "room5":
			title = "Tebjudningen";
			break;
		case "room6":
			title = "Slutstriden";
			break;
		default:
			title = "Escape Room";
	}
	navTitle.textContent = title;
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

function initGameFlow() {
	window.addEventListener("ROOM_1_COMPLETED", () => showRoom("room2"));
	window.addEventListener("ROOM_2_COMPLETED", () => showRoom("room3"));
	window.addEventListener("ROOM_3_COMPLETED", () => showRoom("room4"));
	window.addEventListener("ROOM_4_COMPLETED", () => showRoom("room5"));
	window.addEventListener("ROOM_5_COMPLETED", () => showRoom("room6"));
	window.addEventListener("ROOM_6_COMPLETED", () => showRoom("game-completed"));
}

initGameFlow();