import "../mainstyles/main.scss";
import { completeRoom } from "../engine/GameManager";
import { startTimer } from "../utils";

let catCaughtCount = 0;
let gameRunning = false;
let catFocused = false;

//////////////////
// Starta Spelet//
//////////////////

const startGame = () => {
	startTimer();
	console.log("Game started");
	gameRunning = true;

	const startButton = document.getElementById("start-button-cat");
	const instructions = document.getElementById("instructions");
	const catImage1 = document.getElementById("cat-image-1");
	const catImage = document.getElementById("cat-image");

	// Hide start button, instructions and cat-image-1
	if (instructions) instructions.classList.add("hidden");
	if (startButton) startButton.classList.add("hidden");
	if (catImage1) catImage1.classList.add("hidden");

	// Show cat-image for the game
	if (catImage) {
		catImage.classList.remove("hidden");
		catImage.onclick = () => catchCat();
		catImage.classList.add("no-outline-cat");
	}
	showCatRandom();
};

//////////////////
// Fånga Katten //
//////////////////

function catchCat() {
	const catImage = document.getElementById("cat-image");
	if (!gameRunning || !catImage) return;

	catImage.classList.add("hidden");
	catCaughtCount++;
	catFocused = false;
	console.log("Cat clicked!");

	if (catCaughtCount === 5) {
		console.log("Game over! Cat caught 5 times!");
		gameRunning = false;
		catImage.classList.add("hidden");
		completeRoom(4, "N");

		/* Add artefact here when cat is caught 5 times */
	}
}

///////////////////////////
// Keyboard controls //
/////////////////////////

document.addEventListener("keydown", (e) => {
	const catImage = document.getElementById("cat-image");
	if (!catImage || !gameRunning) return;

	if (e.code === "Space" && !catImage.classList.contains("hidden")) {
		catFocused = true;
		catImage.classList.add("outline-focus-cat");
		console.log("Cat focused");
		e.preventDefault();
	}
	if (catFocused && e.code === "Enter") {
		catchCat();
	}
});

///////////-Function-////////////////
//*Random position within background*///
//////////////////////////////////////////

function showCatRandom() {
	const catImage = document.getElementById("cat-image");
	const background = document.getElementById("backgroundimg");

	if (catImage && background) {
		// background size //
		const backgroundSize = background.getBoundingClientRect();

		// Max position for cat inside background//
		const maxX = backgroundSize.width - catImage.offsetWidth;
		const maxY = backgroundSize.height - catImage.offsetHeight;

		// random position //
		const randomX = Math.floor(Math.random() * maxX);
		const randomY = Math.floor(Math.random() * maxY);

		catImage.style.left = `${randomX}px`;
		catImage.style.top = `${randomY}px`;
		catImage.classList.remove("hidden");
   catImage.classList.remove("outline-focus-cat");
		
   // add shake animation
		catImage.classList.remove("shake"); // reset animation
		void catImage.offsetWidth; // trigger reflow
		catImage.classList.add("shake"); // start shake

		/* Hide cat after 0.8 sec and 
    show again after 1 sec if game continues*/

		setTimeout(() => {
			const catImage = document.getElementById("cat-image");
			if (!catImage) return;
			catFocused = false;

			if (gameRunning && catCaughtCount < 5) {
				setTimeout(showCatRandom, 1000);
			}
		}, 800);
	}
}

//////-Function-/////////
// Start button /////////
/////////////////////////

function startSetup() {
	const startButton = document.getElementById("start-button-cat");
	const catImage1 = document.getElementById("cat-image-1");
	const catImage = document.getElementById("cat-image");

	// Show cat-image-1 before game starts
	if (catImage1) catImage1.classList.remove("hidden");
	if (catImage) catImage.classList.add("hidden");

	if (startButton) {
		startButton.onclick = startGame;
	}
}

startSetup();

export function initRoom4() {
	// Show room4 and start the game
	const room4 = document.getElementById("rum4");
	if (room4) {
		room4.classList.remove("hidden");
	}
	// Start the game if there is a start button
	const startButton = document.getElementById("start-button-cat");
	if (startButton) {
		startButton.onclick = startGame;
	}
}

// Make function available globally if needed
(window as any).initRoom4 = initRoom4;
