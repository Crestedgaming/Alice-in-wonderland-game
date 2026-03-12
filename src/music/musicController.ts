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
		const icon = toggleBtn.querySelector("i");

		if (audioElement.muted) {
			icon?.setAttribute("class", "fi fi-rs-volume-slash");
			toggleBtn.setAttribute("aria-label", "Slå på musik");
		} else {
			icon?.setAttribute("class", "fi fi-rs-volume");
			toggleBtn.setAttribute("aria-label", "Slå av musik");
		}
	});
}

