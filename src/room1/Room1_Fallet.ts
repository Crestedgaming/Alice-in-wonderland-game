// Attach all Room 1 event listeners when content is shown
function attachRoom1Listeners() {
	const room1 = document.getElementById("room1");
	const landing = document.getElementById("room1-landing");
	const content = document.getElementById("room1-content");
	const startBtn = document.getElementById("room1-start-btn");
	const doorElement = document.getElementById("nyckelhalet");
	const keyIds = ["L", "E", "V", "A"];

	// Start button
	if (startBtn && landing && content) {
		startBtn.onclick = () => {
			landing.classList.add("hidden");
			content.classList.remove("hidden");
			startRoom1GameLogic();
		};
	}

	// Keys
	keyIds.forEach((id) => {
		const keyElement = document.getElementById(`nyckeln-${id}`);
		if (keyElement && room1) {
			keyElement.onclick = () => {
				(window as any).selectedKey = id;
				const messageElement = document.getElementById("falletMeddelande");
				if (room1 && !room1.classList.contains("hidden") && messageElement) {
					messageElement.innerHTML = `<p>Du har valt nyckeln med bokstaven ${id}!</p>`;
				}
			};
		}
	});

	// Keyhole
	if (doorElement && room1) {
		doorElement.onclick = () => {
			const messageElement = document.getElementById("falletMeddelande");
			const selectedKey = (window as any).selectedKey || null;
			if (room1 && !room1.classList.contains("hidden") && messageElement) {
				if (selectedKey) {
					messageElement.innerHTML = `<p>Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!<\/p>`;
					const artefaktSpan = document.querySelector("#artefakt1 span");
					if (artefaktSpan) {
						artefaktSpan.textContent = selectedKey;
					}
				} else {
					messageElement.innerHTML = `<p>Du måste välja en nyckel för att låsa upp dörren!<\/p>`;
				}
			}
		};
	}
}
// Visa och göm landningssida och spelinnehåll för Rum 1
export function setupRoom1Landing() {
	attachRoom1Listeners();
}
/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har en unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att välja vilken nyckel den vill ha.
 * Detta måste användaren göra under 1 min, annars måste användaren börja om från början.
 */

// Den här funktionen startar logiken för Rum 1 när sidan laddas eller när rummet återställs
export function initRoom1() {
	// Always show landing and hide content when Room 1 is loaded
	const landing = document.getElementById("room1-landing");
	const content = document.getElementById("room1-content");
	if (landing && content) {
		landing.classList.remove("hidden");
		content.classList.add("hidden");
	}
	setupRoom1Landing();
}

// All logik för själva spelet i Rum 1
function smoothScrollTo(
	element: HTMLElement,
	target: number,
	duration: number,
) {
	const start = element.scrollTop;
	const change = target - start;
	const startTime = performance.now();

	function animateScroll(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		element.scrollTop = start + change * progress;
		if (progress < 1) {
			requestAnimationFrame(animateScroll);
		}
	}
	requestAnimationFrame(animateScroll);
}

function startRoom1GameLogic() {
	// Lista med bokstäver för varje nyckel
	const keyIds = ["L", "E", "V", "A"];
	// Hämta HTML-elementen för varje nyckel
	const keyElements = keyIds.map((id) =>
		document.getElementById(`nyckeln-${id}`),
	);
	// Hämta dörr-elementet
	const doorElement = document.getElementById("nyckelhalet");
	// Hämta elementet som visar tiden
	const timerElement = document.getElementById("falletTimer");
	// Hämta elementet för hela rummet
	const room1 = document.getElementById("room1");

	// --- AUTOMATISK SCROLLNING MED ANPASSAD HASTIGHET ---
	const scrollContainer = document.querySelector(
		"#rum1 .background-scroll",
	) as HTMLElement;
	if (scrollContainer) {
		const SECONDS = 10 * 1000; // Total tid i sekunder för att scrolla hela vägen
		smoothScrollTo(scrollContainer, scrollContainer.scrollHeight, SECONDS); // 9 sekunder
	}

	// Starta en timer som räknar sekunder
	let seconds = 0;
	let timer = setInterval(() => {
		seconds++;
		if (timerElement) {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			// Visa tiden på sidan
			timerElement.innerHTML = `<h2>${mins}:${secs.toString().padStart(2, "0")}</h2>`;
		}
	}, 1000);
	// Key selection and unlocking logic handled by MutationObservers using global selectedKey
	// No duplicate event listeners here
	function onDoorUnlocked(collectedChar: string) {
		const artefaktSpan = document.querySelector("#artefakt1 span");
		if (artefaktSpan) {
			artefaktSpan.textContent = collectedChar;
		}
		// Här kan du lägga till mer logik om du vill
	}

	// Visar startmeddelandet till spelaren
	function setStartMessage(retries = 5) {
		const messageElement = document.getElementById("falletMeddelande");
		if (messageElement?.classList.contains("falletMeddelande")) {
			messageElement.innerHTML = "<p>Fort! Välj en nyckel innan du landar!</p>";
		} else if (retries > 0) {
			setTimeout(() => setStartMessage(retries - 1), 50);
		}
	}
	// Visa startmeddelandet när allt är klart
	setStartMessage();
}
