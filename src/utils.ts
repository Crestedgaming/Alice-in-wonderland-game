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

export function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  setInterval(() => {
    seconds++;

    const timerElement = document.getElementById("falletTimerTotalt");

    if (timerElement) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;

      timerElement.textContent =
        `Tid i rummet: ${String(minutes).padStart(2, "0")}.${String(secs).padStart(2, "0")}`;
    }
  }, 1000);
}

