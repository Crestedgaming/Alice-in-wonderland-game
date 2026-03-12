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

	// Set initial icon to match muted state
	audioElement.muted = true;
	const icon = toggleBtn.querySelector("i");
	icon?.setAttribute("class", "fa fa-volume-off");
	toggleBtn.setAttribute("aria-label", "Slå på musik");

	// Start playing (muted)
	audioElement.play();

	toggleBtn.addEventListener("click", () => {
		audioElement.muted = !audioElement.muted;
		const icon = toggleBtn.querySelector("i");

		if (audioElement.muted) {
			icon?.setAttribute("class", "fa fa-volume-off");
			toggleBtn.setAttribute("aria-label", "Slå på musik");
		} else {
			icon?.setAttribute("class", "fa fa-volume-up");
			toggleBtn.setAttribute("aria-label", "Slå av musik");
		}
	});
}

