/**
 * Simple music toggle - muted by default
 */

export function initMusicController(): void {
	const audioElement = document.getElementById(
		"backgroundMusic"
	) as HTMLAudioElement;
	const toggleBtn = document.getElementById(
		"musicToggleBtn"
	) as HTMLButtonElement;

	if (!audioElement || !toggleBtn) {
		return;
	}

	toggleBtn.addEventListener("click", () => {
		audioElement.muted = !audioElement.muted;
		toggleBtn.textContent = audioElement.muted ? "🔇" : "🔊";
		toggleBtn.setAttribute(
			"aria-label",
			audioElement.muted ? "Slå på musik" : "Slå av musik"
		);
	});
}
