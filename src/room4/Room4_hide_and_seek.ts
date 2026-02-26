import "../mainstyles/main.scss";

let catCaughtCount = 0;
let gameRunning = false; 
let catFocused = false;

//////////////////
/* Starta Spelet*/
/////////////////

const startGame = () => {
  console.log("Game started");
  gameRunning = true;


    const startButton = document.getElementById('start-button-cat');
    const instructions = document.getElementById('instructions');
    const catImage1 = document.getElementById('cat-image-1');

// Dölj startnapp, instruktioner och statisk knapp.// 
    if (instructions) 
      instructions.style.display = 'none';
    if (startButton) 
      startButton.style.display = 'none';
    if (catImage1)      
      catImage1.style.display = 'none';

// Lägg till klick-event på katten// 
    const catImage = document.getElementById('cat-image');
    if (catImage) {
      catImage.onclick = () => catchCat();
      catImage.style.outline = 'none';

    }
// starta kattens slumpmässiga visning//
  showCatRandom();
};


//////////////////
/* Fånga Katten */
///////////////// 

function catchCat() {
  const catImage = document.getElementById('cat-image');
   if (!gameRunning || !catImage) return;

   catImage.style.display = 'none';
   catCaughtCount++;
   catFocused = false;
    console.log("Cat clicked!");

   if (catCaughtCount === 5) {
         console.log(" spelet är slut! Katten fångad 5 gånger!");
         gameRunning = false;
         catImage.style.display = 'none';

         /* Lägg till artefakt här, när katten är fångad 5 gånger */
       }
     }
///////////////////////////   
// Tangentbordkontroller//
/////////////////////////

document.addEventListener('keydown', (e) => {
  const catImage = document.getElementById('cat-image');
  if (!catImage || !gameRunning) return;

  if (e.code === 'Space' && catImage.style.display === 'block') {
    catFocused = true;
    catImage.style.outline = '3px solid #bf5A50';
    console.log("Cat focused");    
    e.preventDefault();
  }
  if (catFocused && e.code === 'Enter') {
    catchCat();
  }
});

///////////-Funktion-////////////////
//*Slumpmässig position inom bakgrunden*///
//////////////////////////////////////////

function showCatRandom() {
  const catImage = document.getElementById('cat-image');
  const background = document.getElementById('backgroundimg');

  if (catImage && background) {

    // bakgrundsstorlek //
    const backgroundSize = background.getBoundingClientRect();

    // Max position för katt innanför bakgrund//
    const maxX = backgroundSize.width - catImage.offsetWidth;
    const maxY = backgroundSize.height - catImage.offsetHeight;

    // slumpad position //
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    catImage.style.left = `${randomX}px`;
    catImage.style.top = `${randomY}px`;
catImage.style.display = 'block';

 /* Dölj katten efter 1,5 sek och 
 visa den igen efter 1 sek om spelet fortsätter*/

    setTimeout(() => {
      catImage.style.display = 'none';
      catImage.style.outline = 'none';
      catFocused = false;
    
      if(gameRunning && catCaughtCount <5) {
        setTimeout(showCatRandom, 1000);
      }
    },1500);
}
}
     
//////-Funktion-/////////
/////Startknappen///////
///////////////////////

function startSetup() {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }
}

startSetup();