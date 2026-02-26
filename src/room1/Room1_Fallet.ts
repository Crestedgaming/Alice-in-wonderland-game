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
    // Hämta landningssidan och huvud-innehållet
    const landing = document.getElementById("room1-landing");
    const mainContent = document.getElementById("room1-main-content");
    if (landing && mainContent) {
        landing.style.display = "";
        mainContent.style.display = "none";
        const startBtn = document.getElementById("room1-start-btn");
        if (startBtn) {
            startBtn.onclick = () => {
                landing.style.display = "none";
                mainContent.style.display = "";
                startRoom1GameLogic();
            };
        }
    } else {
        // Om landningssidan inte finns, starta spelet direkt (bakåtkompatibilitet)
        startRoom1GameLogic();
    }
}

// All logik för själva spelet i Rum 1
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
	let selectedKey: string | null = null;

	// När spelaren klickar på en nyckel
	keyElements.forEach((keyElement, index) => {
		if (!keyElement) return;
		keyElement.addEventListener("click", () => {
			// Spara vilken nyckel som valts
			selectedKey = keyIds[index];
			const messageElement = document.getElementById("falletMeddelande");
			// Visa meddelande om vilken nyckel som valts
			if (room1 && !room1.classList.contains("hidden") && messageElement) {
				messageElement.innerHTML = `<p>Du har valt nyckeln med bokstaven ${selectedKey}!</p>`;
			}
		});
	});

	// Den här funktionen körs när dörren har låsts upp
	function onDoorUnlocked(collectedChar: string) {
		// Uppdatera bokstaven i artefaktlistan
		const artefaktSpan = document.querySelector("#artefakt1 span");
		if (artefaktSpan) {
			artefaktSpan.textContent = collectedChar;
		}
		// Här kan du lägga till mer logik om du vill
	}
	// När spelaren klickar på dörren
	if (doorElement) {
		doorElement.addEventListener("click", () => {
			const messageElement = document.getElementById("falletMeddelande");
			// Kontrollera att rummet är synligt och att meddelande-elementet finns
			if (room1 && !room1.classList.contains("hidden") && messageElement) {
				if (selectedKey) {
					// Om en nyckel är vald, visa meddelande och uppdatera artefakt
					messageElement.innerHTML = `<p>Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!<\/p>`;
					clearInterval(timer);
					onDoorUnlocked(selectedKey);
				} else {
					// Om ingen nyckel är vald, visa felmeddelande
					messageElement.innerHTML = `<p>Du måste välja en nyckel för att låsa upp dörren!<\/p>`;
				}
			}
		});
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

