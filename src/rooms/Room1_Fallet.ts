/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har en unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att välja vilken nyckel den vill ha.
 * Detta måste användaren göra under 1 min, annars måste användaren börja om från början.
 */

// Hämta nyckelelementen från HTML
const keyIds = ["nyckel1", "nyckel2", "nyckel3", "nyckel4"];
const keyElements = keyIds.map((id) => document.getElementById(id));
const doorElement = document.getElementById("key-hole");

// Skapa meddelandeelement
const messageElement = document.createElement("div");
messageElement.classList.add("message");
messageElement.style.cssText =
	"position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 8px; font-size: 18px; z-index: 1000;";
document.body.appendChild(messageElement);

messageElement.textContent = `Fort, välj en nyckel innan tiden är ute!`;

let selectedKey: string | null = null;
let timer: number | null = null;

keyElements.forEach((keyElement, index) => {
	if (!keyElement) {
		console.error(`Du har inte valt någon nyckel "${keyIds[index]}"`);
		return;
	}
	keyElement.style.cursor = "pointer";
	keyElement.addEventListener("click", (e) => {
		e.stopPropagation();
		selectedKey = String(index + 1);
		messageElement.textContent = `Du har valt nyckeln ${selectedKey}`;
		if (timer) {
			clearTimeout(timer);
		}
		timer = window.setTimeout(() => {
			selectedKey = null;
			messageElement.textContent = "Tiden är ute! Välj en nyckel igen.";
		}, 60000); // 1 minute
	});
});

if (doorElement) {
	doorElement.addEventListener("click", () => {
		if (selectedKey) {
			messageElement.textContent = `Du har låst upp dörren med nyckel ${selectedKey}!`;
		} else {
			messageElement.textContent =
				"Du måste välja en nyckel för att låsa upp dörren!";
		}
	});
} else {
	console.error('Nyckelhål med id "key-hole" hittades inte');
}


/**
 * <div class="fallet-container hidden">
        <div>
            <img class="alice-faller" src="/public/alice-faller.png" alt="Alice faller">
            <img class="background-image" src="/public/bakgrund.webp" alt="Alice ramlar ner i kaninhålet">
        </div>
        <div id="nycklar">
            <img id="nyckel1" class="nyckel1" src="/public/nyckel_1.gif"
                alt="En guldnyckel med en topp som snurrar i lila färg" />
            <img id="nyckel2" class="nyckel2" src="/public/nyckel_2.gif"
                alt="En ljusblå nyckel med toppen som är formad som en klöver" />
            <img id="nyckel3" class="nyckel3" src="/public/nyckel_3.gif" alt="En guldnyckel med en krona i toppen." />
            <img id="nyckel4" class="nyckel4" src="/public/nyckel_4.gif" alt="En guldnyckel med en stjärna i toppen." />
        </div>
        <div id="key-hole-container">
            <img id="key-hole" class="key-hole" src="/public/nyckelhalet.gif"
                alt="Ett nyckelhål till en dörr som blir stor och liten i en loop" />
        </div>
    </div>
 */