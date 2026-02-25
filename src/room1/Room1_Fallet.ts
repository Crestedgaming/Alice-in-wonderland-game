/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har en unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att välja vilken nyckel den vill ha.
 * Detta måste användaren göra under 1 min, annars måste användaren börja om från början.
 */

export function initRoom1() {
	const keyIds = ["L", "E", "V", "A"];
	const keyElements = keyIds.map((id) =>
		document.getElementById(`nyckeln-${id}`),
	);
	const doorElement = document.getElementById("nyckelhalet");
	const timerElement = document.getElementById("falletTimer");
	let seconds = 0;
	let timer = setInterval(() => {
		seconds++;
		if (timerElement) {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			timerElement.innerHTML = `<h2>${mins}:${secs.toString().padStart(2, "0")}</h2>`;
		}
	}, 1000);

	function setStartMessage(retries = 5) {
		const messageElement = document.getElementById("falletMeddelande");
		if (messageElement?.classList.contains("falletMeddelande")) {
			messageElement.innerHTML = "<p>Fort! Välj en nyckel innan du landar!</p>";
			console.log("Start message set.");
		} else if (retries > 0) {
			// Try again after a short delay if the element isn't found yet
			setTimeout(() => setStartMessage(retries - 1), 50);
			console.log("Retrying setStartMessage, attempts left:", retries - 1);
		} else {
			console.warn("falletMeddelande element not found after retries.");
		}
	}

	const room1 = document.getElementById("rum1");
	let selectedKey: string | null = null;

	keyElements.forEach((keyElement, index) => {
		if (!keyElement) return;
		keyElement.addEventListener("click", () => {
			selectedKey = keyIds[index];
			const messageElement = document.getElementById("falletMeddelande");
			if (room1 && !room1.classList.contains("hidden") && messageElement) {
				messageElement.innerHTML = `<p>Du har valt nyckeln med bokstaven ${selectedKey}!</p>`;
			}
		});
	});

	function onDoorUnlocked(collectedChar: string) {
		// Update the artefact character
		const artefaktSpan = document.querySelector("#artefakt1 span");
		if (artefaktSpan) {
			artefaktSpan.textContent = collectedChar;
		}
		// Additional logic can be added here (toggle, etc)
	}

	if (doorElement) {
		doorElement.addEventListener("click", () => {
			const messageElement = document.getElementById("falletMeddelande");
			if (room1 && !room1.classList.contains("hidden") && messageElement) {
				if (selectedKey) {
					messageElement.innerHTML = `<p>Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!<\/p>`;
					clearInterval(timer);
					onDoorUnlocked(selectedKey);
				} else {
					messageElement.innerHTML = `<p>Du måste välja en nyckel för att låsa upp dörren!<\/p>`;
				}
			}
		});
	}

	// Set the start message after all listeners are set up and DOM is ready
	setStartMessage();
}
