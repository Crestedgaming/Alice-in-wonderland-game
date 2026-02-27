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