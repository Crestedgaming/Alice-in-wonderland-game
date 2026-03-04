/** const defaultArtefactTokens = ["I", "II", "III", "IV", "V"];
const awardedRooms = new Set<string>();

function getArtefactSpans(): HTMLSpanElement[] {
	return Array.from(
		document.querySelectorAll<HTMLSpanElement>("#showArtefacts li span"),
	);
}

function isCollectedValue(value: string): boolean {
	return value.length > 0 && !defaultArtefactTokens.includes(value);
}

export function updateArtefactsFooter(): void {
	const artefactSpans = getArtefactSpans();
	const collectedCount = artefactSpans.filter((span) =>
		isCollectedValue((span.textContent || "").trim()),
	).length;

	const progress = artefactSpans.length
		? Math.round((collectedCount / artefactSpans.length) * 100)
		: 0;

	const progressBar = document.getElementById("myBar");
	if (progressBar) {
		progressBar.style.width = `${progress}%`;
	}
}

export function assignRandomArtefacts(
	letter: string,
	roomId?: string,
): boolean {
	const normalizedLetter = letter.trim().toUpperCase();
	if (!normalizedLetter) return false;

	if (roomId && awardedRooms.has(roomId)) {
		updateArtefactsFooter();
		return false;
	}

	const artefactSpans = getArtefactSpans();

	const alreadyExists = artefactSpans.some(
		(span) => (span.textContent || "").trim() === normalizedLetter,
	);
	if (alreadyExists) {
		updateArtefactsFooter();
		return false;
	}

	const availableSpans = artefactSpans.filter(
		(span) => !isCollectedValue((span.textContent || "").trim()),
	);

	if (availableSpans.length === 0) {
		updateArtefactsFooter();
		return false;
	}

	const randomIndex = Math.floor(Math.random() * availableSpans.length);
	availableSpans[randomIndex].textContent = normalizedLetter;
	if (roomId) {
		awardedRooms.add(roomId);
	}
	updateArtefactsFooter();
	return true;
}

*/
