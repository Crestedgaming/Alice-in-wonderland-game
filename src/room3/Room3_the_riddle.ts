// Room 3 – The Caterpillar Riddles
import { startTimer, stopTimer, startTotalTimer, pauseTotalTimer } from "../utils";
import { completeRoom } from "../engine/GameManager";

export function initRoom3(): void {
		
	// --- Get fresh DOM references every time room opens ---
	const rum3StartButton = document.getElementById(
		"rum3-start-button",
	) as HTMLButtonElement;
	const riddleContainer = document.getElementById(
		"riddle-container",
	) as HTMLDivElement;

	if (!rum3StartButton || !riddleContainer) return;

	// --- Riddle data ---
	const riddles = [
		{ id: "riddle1", answer: ["människa", "människan"] },
		{ id: "riddle2", answer: ["solen", "sol"] },
		{ id: "riddle3", answer: ["dammråtta"] },
	];

	let currentRiddle = 0;
	let correctAnswers = 0;

	function resetRoom3State(): void {
		rum3StartButton.classList.remove("hidden");
		riddleContainer.classList.add("hidden");

		riddles.forEach((r) => {
			const el = document.getElementById(r.id);
			if (!el) return;

			el.classList.add("hidden");
			el.classList.remove("correct", "wrong");

			const input = el.querySelector("input") as HTMLInputElement | null;
			if (input) {
				input.value = "";
			}
		});

		const nextBtn = document.getElementById("room3-next");
		nextBtn?.classList.add("hidden");
	}

	resetRoom3State();

	// -----------------------------
	// Show specific riddle
	// -----------------------------
	function showRiddle(index: number): void {
		riddles.forEach((r) => {
			const el = document.getElementById(r.id);
			if (el) el.classList.add("hidden");
		});

		const active = document.getElementById(riddles[index].id);
		if (active) active.classList.remove("hidden");
	}

	// -----------------------------
	// Start room
	// -----------------------------
	function startRiddle(): void {
	startTimer("gameTimerEachRoom");
	startTotalTimer("gameTimerTotal");
		rum3StartButton.classList.add("hidden");
		riddleContainer.classList.remove("hidden");
		currentRiddle = 0;
		correctAnswers = 0;
		showRiddle(0);
	}

	// -----------------------------
	// Normalize player input
	// -----------------------------
	function normalize(text: string): string {
		return text
			.trim()
			.toLowerCase()
			.replace(/[.,!?]/g, "");
	}

	// -----------------------------
	// Check answer
	// -----------------------------
	function checkAnswer(index: number): void {
		const riddleEl = document.getElementById(riddles[index].id)!;
		const input = riddleEl.querySelector("input") as HTMLInputElement;

		const playerAnswer = normalize(input.value);

		const isCorrect = riddles[index].answer.some(
			(a) => normalize(a) === playerAnswer,
		);

		if (isCorrect) {
			correctAnswers++;
			riddleEl.classList.add("correct");
		} else {
			riddleEl.classList.add("wrong");
		}

		currentRiddle++;

		if (currentRiddle < riddles.length) {
			showRiddle(currentRiddle);
		} else {
			finishRoom3();
		}
	}

	// -----------------------------
	// Decide artifact (REAL vs FAKE)
	// -----------------------------
	function finishRoom3(): void {
	stopTimer();
	pauseTotalTimer();
		let letter: string;
		let message: string;

		if (correctAnswers >= 2) {
			letter = "K";
			message =
				"🐛 Larven blåser en perfekt rökring... 'Du börjar förstå vem du är.'";
		} else {
			letter = "S";
			message = "🐛 Larven ler snett... 'Rätt och fel är bara ord.'";
		}

		giveArtifact(letter);
		completeRoom(3, letter);

	riddleContainer.classList.add("hidden");

		// Hide individual riddles (not the container, so the button stays visible)
		riddles.forEach((r) => {
			const el = document.getElementById(r.id);
			if (el) el.classList.add("hidden");
		});

		// Show message (optional: add a <p id="room3-message"> in HTML if you want)
		alert(message + " Du få bokstaven: " + letter);

		// Show next button
		const nextBtn = document.getElementById("room3-next");
		nextBtn?.classList.remove("hidden");
	}
	// -----------------------------
	// Artifact hook (connect later)
	// -----------------------------
	function giveArtifact(letter: string): void {
		console.log("Artifact received:", letter);
	}

	// -----------------------------
	// Event listeners
	// -----------------------------
	// -----------------------------
	// Event listeners
	// -----------------------------
	rum3StartButton.onclick = startRiddle;

	riddles.forEach((_, i) => {
		const btn = document.getElementById(`submit${i + 1}`);
		if (btn) {
			btn.onclick = () => checkAnswer(i);
		}
	});
}
