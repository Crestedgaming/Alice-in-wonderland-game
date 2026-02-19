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
/** 
const nyckel1: HTMLImageElement | null = document.getElementById("nyckel1");
const nyckel2: HTMLImageElement | null = document.getElementById("nyckel2");
const nyckel3: HTMLImageElement | null = document.getElementById("nyckel3");
const nyckel4: HTMLImageElement | null = document.getElementById("nyckel4");
const nyckelhal: HTMLImageElement | null = document.getElementById("nyckelhal");
const nyckelBokstav: [string] = ["L", "E", "V", "A"];

if (!nyckel1 || !nyckel2 || !nyckel3 || !nyckel4 || !nyckelhal) {
    throw new Error("Kunde inte hitta alla några nycklar.");
}

const nyckelBokstav: string[] = ["L", "E", "V", "A"];
let valdNyckel = "";

function nyckelKlick(nyckel: HTMLImageElement, bokstav: string): void {
    nyckel.addEventListener("click", () => {
        valdNyckel = bokstav;
        nyckelhal.classList.add("clickable");
    });
}

// Nu används nyckelBokstav => ingen 'never read'-varning
[nyckel1, nyckel2, nyckel3, nyckel4].forEach((nyckel, index) => {
    nyckelKlick(nyckel, nyckelBokstav[index]);
});

nyckelhal.addEventListener("click", () => {
    if (!valdNyckel) {
        console.log("Du måste välja en nyckel först.");
        return;
    }
    console.log(`Du fick bokstaven: ${valdNyckel}`);
});
*/

/**
 * <div class="fallet-container hidden">
        <div>
            <img class="alice-faller" src="/public/alice-faller.png" alt="Alice faller">
            <img class="background-image" src="/public/bakgrund.webp" alt="Alice ramlar ner i kaninhålet">
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
