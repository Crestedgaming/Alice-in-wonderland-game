import "./style/style.scss";

import { initIntroScreen, showIntroScreen } from "./intro/intro.ts";
import { initRoom1 } from "./room1/room1.ts";
import { initRoom2 } from "./room2/room2.ts";
import { initRoom3 } from "./room3/room3.ts";
import { initRoom4 } from "./room4/room4.ts";
import { initRoom5 } from "./room5/room5.ts";
import { initRoom6 } from "./room6/room6.ts";
import { hideGameOver, initGameOver } from "./game-over/gameOver.ts";

function initGame() {
	initIntroScreen();

	window.addEventListener("INTRO_COMPLETE", goToRoom1);
	window.addEventListener("ROOM_1_COMPLETED", goToRoom2);
	window.addEventListener("ROOM_2_COMPLETED", goToRoom3);
	window.addEventListener("ROOM_3_COMPLETED", goToRoom4);
	window.addEventListener("ROOM_4_COMPLETED", goToRoom5);
	window.addEventListener("ROOM_5_COMPLETED", goToRoom6);
	window.addEventListener("ROOM_6_COMPLETED", gameOver);
	window.addEventListener("RESTART_GAME", restartFromIntro);
}

function goToRoom1() {
	console.log("go to room 1");
	initRoom1();
}

function goToRoom2() {
	console.log("go to room 2");
	initRoom2();
}

function goToRoom3() {
	console.log("go to room 3");
	initRoom3();
}

function goToRoom4() {
	console.log("go to room 4");
	initRoom4();
}

function goToRoom5() {
	console.log("go to room 5");
	initRoom5();
}

function goToRoom6() {
	console.log("go to room 6");
	initRoom6();
}

function gameOver() {
	initGameOver();
}

function restartFromIntro() {
	const sectionsToHide = [
		"#room1",
		"#room2",
		"#room3",
		"#room4",
		"#room5",
		"#room6",
	];

	for (const selector of sectionsToHide) {
		document.querySelector(selector)?.classList.add("hidden");
	}

	hideGameOver();
	showIntroScreen();
	initIntroScreen();
}

initGame();
