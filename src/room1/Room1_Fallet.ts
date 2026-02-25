/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har en unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att välja vilken nyckel den vill ha.
 * Detta måste användaren göra under 1 min, annars måste användaren börja om från början.
 */

// Hämta nyckelelementen från HTML

const keyIds = ["L", "E", "V", "A"];
const keyElements = keyIds.map((id) =>
	document.getElementById(`nyckeln-${id}`),
);
const doorElement = document.getElementById("nyckelhalet");

const timerElement = document.getElementById("falletTimer");
let seconds = 0;

const timer = setInterval(() => {
	seconds++;
	if (timerElement) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		timerElement.innerHTML = `<h2>${mins}:${secs.toString().padStart(2, "0")}</h2>`;
	}
}, 1000);

// Skapa meddelandeelement

const messageElement = document.createElement("div");
messageElement.classList.add("falletMeddelande");
document.body.appendChild(messageElement);

messageElement.innerHTML = `<p>Fort, välj en nyckel innan du landar!</p>`;

let selectedKey: string | null = null;

keyElements.forEach((keyElement, index) => {
	if (!keyElement) {
		console.error(`Du har inte valt någon nyckel "${keyIds[index]}"`);
		return;
	}
	keyElement.style.cursor = "pointer";
	// Mouse click
	keyElement.addEventListener("click", (e) => {
		e.stopPropagation();
		selectedKey = keyIds[index];
		messageElement.innerHTML = `<p>Du har valt nyckeln med bokstaven ${selectedKey}!</p>`;
	});
	// Keyboard accessibility: Enter/Space
	keyElement.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			selectedKey = keyIds[index];
			messageElement.innerHTML = `<p>Du har valt nyckeln med bokstaven ${selectedKey}!</p>`;
			// Optionally, visually indicate selection
			keyElement.classList.add("selected-key");
		}
	});
});

if (doorElement) {
	doorElement.addEventListener("click", () => {
		if (selectedKey) {
			messageElement.innerHTML = `<p>Du har låst upp dörren med ${selectedKey}!</p>`;
			clearInterval(timer); // Stoppa timern när dörren låses upp
		} else {
			messageElement.innerHTML = `<p>Du måste välja en nyckel för att låsa upp dörren!</p>`;
		}
	});
	// Keyboard accessibility: Enter/Space
	doorElement.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			doorElement.click();
		}
	});
} else {
	console.error("Du har inte valt någon nyckel");
}


