/**
 * Spelaren måste scrolla ned längst sidan för att kunna hitta dörren som leder till nästa nivå.
 * På vägen ner måste spelaren välja en av de fyra nycklarna för att kunna öppna dörren.
 * Varje nyckel har en unik utseende.
 * Varje nyckel generera en unik bostav som visas på skärmen efter att man har låst upp dörren.
 * Det finns inget krav på vilken nyckel det är som spelaren väljer, så det är upp till spelaren att välja vilken nyckel den vill ha.
 * Detta måste användaren göra under 1 min, annars måste användaren börja om från början.
 */

/** 
const html = `<div>
        <div>
            <img class="alice-faller" src="/public/images/Room1_bilder/alice-faller.png" alt="Alice faller">
            <img class="background-image" src="/public/images/Room1_bilder/bakgrund.webp" alt="Alice ramlar ner i kaninhålet">
        </div>
        <div id="nycklar">
            <img id="nyckel1" class="nyckel1" src="/public/images/Room1_bilder/nyckel_1.gif"
                alt="En guldnyckel med en topp som snurrar i lila färg" />
            <img id="nyckel2" class="nyckel2" src="/public/images/Room1_bilder/nyckel_2.gif"
                alt="En ljusblå nyckel med toppen som är formad som en klöver" />
            <img id="nyckel3" class="nyckel3" src="/public/images/Room1_bilder/nyckel_3.gif" alt="En guldnyckel med en krona i toppen." />
            <img id="nyckel4" class="nyckel4" src="/public/images/Room1_bilder/nyckel_4.gif" alt="En guldnyckel med en stjärna i toppen." />
        </div>
        <div id="key-hole-container">
            <img id="key-hole" class="key-hole" src="/public/images/Room1_bilder/nyckelhal.gif"
                alt="Ett nyckelhål till en dörr som blir stor och liten i en loop" />
        </div>
    </div>`;
    
export function renderRoom1(): void {
	const container = document.getElementById("game-container");
	if (container) {
		container.innerHTML = html;
	}
}

*/