/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har ett unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att komma på vilken nyckel som är rätt.
 * Detta måste användaren göra så fort som möjligt för att få minst poäng som baseras på tid.
 */

/**
 * När spelaren har klickat på börja spela tas classen hidden bort från kod-blocket.
 * Hämta alla html-element för nycklarna och nyckelhålet.
 * Tilldela alla nycklarna varsin bokstav.
 * Skapa ett klick-event för nycklarna som triggar igång att nyckelhålet går att klicka på.
 * När nyckelhålet är klickad visas vilken bokstav spelaren har samlat på sig(artefakt).
 * Skulle användaren inte ha klickat på en nyckel kommer en text att visas som säger att spelaren måste välja en nyckel.
 */

// if (inloggning === true) {
// 	document.querySelector(".fallet-container").classList.remove("hidden");
// Hämta nyckelelementen från HTML
/**
const keyIds = ["nyckel1", "nyckel2", "nyckel3", "nyckel4"];
const keyElements = keyIds.map((id) => document.getElementById(id));
const doorElement = document.getElementById("key-hole");

const timerElement = document.getElementById("timer");
let seconds = 0;

const timer = setInterval(() => {
  seconds++;
  if (timerElement) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  }
}, 1000);

// Skapa meddelandeelement
const messageElement = document.createElement("div");
messageElement.classList.add("message");
messageElement.style.cssText =
  "position: fixed; top: 5px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 8px; font-size: 18px; z-index: 1000;";
document.body.appendChild(messageElement);

messageElement.textContent = `Fort, välj en nyckel innan du landar!`;

let selectedKey: string | null = null;

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
  });
});

if (doorElement) {
  doorElement.addEventListener("click", () => {
    if (selectedKey) {
      messageElement.textContent = `Du har låst upp dörren med nyckel ${selectedKey}!`;
      clearInterval(timer); // Stoppa timern när dörren låses upp
    } else {
      messageElement.textContent =
        "Du måste välja en nyckel för att låsa upp dörren!";
    }
  });
} else {
  console.error("Du har inte valt någon nyckel");
}
*/

/**
 * <div class="fallet-container hidden">
        <div>
            <img class="alice-faller" src="/public/alice-faller.png" alt="Alice faller">
            <img class="background-image" src="/public/bakgrund.webp" alt="Ett kaninhål som Alice ramlar ner i med en dörr längst ned på bilen, på dörren finns ett nyckelhål">
        </div>
        <div id="nycklar" class="nycklar">
            <img id="nyckel1" class="nyckel1" src="/public/nyckel_1.gif"
                alt="En guldnyckel med en topp som snurrar i lila färg" />
            <img id="nyckel2" class="nyckel2" src="/public/nyckel_2.gif"
                alt="En ljusblå nyckel med toppen som är formad som en klöver" />
            <img id="nyckel3" class="nyckel3" src="/public/nyckel_3.gif" alt="En guldnyckel med en krona i toppen." />
            <img id="nyckel4" class="nyckel4" src="/public/nyckel_4.gif" alt="En guldnyckel med en stjärna i toppen." />
            <img id="key-hole" class="key-hole" src="/public/nyckelhalet.gif"
                alt="Ett nyckelhål till en dörr som blir stor och liten i en loop" />
        </div>
        </div>
    </div>
 */
