// Visa landningssidan och göm spelet

export function initRoom1() {
	// Hämtar startsidan och spelinnehållet för rum 1.
	let landing = document.getElementById("room1StartPage");
	let content = document.getElementById("room1Container");
	if (landing && content) {
		// Visar startsidan först och gömmer själva spelet.
		landing.classList.remove("hidden");
		content.classList.add("hidden");
	}
	let startBtn = document.getElementById("room1StartButton");
	if (startBtn) {
		startBtn.onclick = function () {
			// När spelaren klickar start visas spelet och startsidan döljs.
			if (landing && content) {
				landing.classList.add("hidden");
				content.classList.remove("hidden");
			}
			// Kopplar lyssnare och startar spelloopen för rummet.
			attachRoom1Listeners();
			startRoom1GameLogic();
		};
	}
	const nextBtn = document.getElementById("room1-next");

	nextBtn?.addEventListener("click", () => {
		window.dispatchEvent(new Event("ROOM_1_COMPLETED"));
	});
}
window.initRoom1 = initRoom1;

// Sätt event på nycklar och nyckelhål
function attachRoom1Listeners() {
	let keyL = document.getElementById("keyL");
	let keyE = document.getElementById("keyE");
	let keyV = document.getElementById("keyV");
	let keyA = document.getElementById("keyA");
	let keyhole = document.getElementById("keyhole");
	let message = document.getElementById("fallMessage");
	// Ingen nyckel är vald när rummet startar.
	window.selectedKey = null;

	if (keyL)
		keyL.onclick = function () {
			window.selectedKey = "L";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven L!</p>";
		};
	if (keyE)
		keyE.onclick = function () {
			window.selectedKey = "E";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven E!</p>";
		};
	if (keyV)
		keyV.onclick = function () {
			window.selectedKey = "V";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven V!</p>";
		};
	if (keyA)
		keyA.onclick = function () {
			window.selectedKey = "A";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven A!</p>";
		};

	if (keyhole)
		keyhole.onclick = function () {
			// Läser av vilken nyckel spelaren senast valde.
			let selectedKey = window.selectedKey;
			if (selectedKey && message) {
				// Visar bekräftelse och skriver bokstaven till artefaktplatsen.
				message.innerHTML = `<p>Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!</p>`;
				let artefactsSpan = document.querySelector("#artefact1 span");
				if (artefactsSpan) artefactsSpan.textContent = selectedKey;
				// 👇 SHOW NEXT ROOM BUTTON
				const nextBtn = document.getElementById("room1-next");
				nextBtn?.classList.remove("hidden");
			} else if (message) {
				message.innerHTML =
					"<p>Du måste välja en nyckel för att låsa upp dörren!</p>";
			}
		};
}

// Enkel scroll och startmeddelande
function startRoom1GameLogic() {
	// Hämtar containern som ska scrollas under fallet.
	let scrollContainer = document.querySelector(
		"#room1 .backgroundScroll",
	) as HTMLElement;
	if (scrollContainer) {
		let start = scrollContainer.scrollTop;
		let target = scrollContainer.scrollHeight;
		let duration = 15000;
		let startTime = performance.now();
		// Mjuk animation som scrollar från toppen till botten.
		function animateScroll(currentTime: number) {
			let elapsed = currentTime - startTime;
			let progress = Math.min(elapsed / duration, 1);
			scrollContainer.scrollTop = start + (target - start) * progress;
			if (progress < 1) {
				requestAnimationFrame(animateScroll);
			}
		}
		requestAnimationFrame(animateScroll);
	}
	let message = document.getElementById("fallMessage");
	if (message) {
		// Startmeddelande till spelaren.
		message.innerHTML = "<p>Fort! Välj en nyckel innan du landar!</p>";
	}
}
