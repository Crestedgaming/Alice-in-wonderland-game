/** export function assignRandomArtefakt(letter: string) {
	const artefaktSpans = document.querySelectorAll("#visaArtefakter li span");
	// Only assign to artefakts that still have their default value (not already set)
	const available = Array.from(artefaktSpans).filter(
		(span) => !["L", "E", "V", "A", "K", "N"].includes(span.textContent || ""),
	);
	if (available.length > 0) {
		const randomIndex = Math.floor(Math.random() * available.length);
		available[randomIndex].textContent = letter;
	}
}

*/

let seconds = 0;
let timerStarted = false;
let timerInterval: number;
let timerElement: HTMLElement | null = null;

export function startTimer(elementId: string) {
	if (timerStarted) return;

	timerStarted = true;

	timerElement = document.getElementById(elementId);

	timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
	seconds++;

	if (timerElement) {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;

		timerElement.textContent =
			`Tid i rummet: ${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	}
}

export function stopTimer() {
	clearInterval(timerInterval);
	timerStarted = false;
	seconds = 0;
}

// ============================
// TOTAL GAME TIMER
// ============================

let totalSeconds = 0;
let totalInterval: number;
let totalRunning = false;
let totalTimerElement: HTMLElement | null = null;

export function startTotalTimer(elementId: string) {

	totalTimerElement = document.getElementById(elementId);

	if (totalRunning) return;

	totalRunning = true;

	totalInterval = window.setInterval(() => {

		totalSeconds++;

		if (totalTimerElement) {
			const min = Math.floor(totalSeconds / 60);
			const sec = totalSeconds % 60;

			totalTimerElement.textContent =
				`Total tid: ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
		}

	}, 1000);
}

export function pauseTotalTimer() {
	clearInterval(totalInterval);
	totalRunning = false;
}

export function resetTotalTimer() {
	clearInterval(totalInterval);
	totalRunning = false;
	totalSeconds = 0;
	const totalEl = document.getElementById("gameTimerTotal");
	if (totalEl) {
		totalEl.textContent = "Total tid: 00:00";
		
	}
		const roomEl = document.getElementById("gameTimerEachRoom");

	if (roomEl) {
		roomEl.textContent = "Tid i rummet: 00:00";
	}

}

export function getTotalTime(): number {
    return totalSeconds;
}