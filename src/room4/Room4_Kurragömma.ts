import './style.scss'

let catCaughtCount = 0;
let gameInterval: any;
let gameRunning = false; 
let catFocused = false;

const startGame = () => {
  console.log("Game started");
  gameRunning = true;


    const startButton = document.getElementById('start-button');
    const instructions = document.getElementById('instructions');
    const catImage1 = document.getElementById('cat-image-1');
    if (instructions) 
      instructions.style.display = 'none';
    if (startButton) 
      startButton.style.display = 'none';
    if (catImage1)      
      catImage1.style.display = 'none';

    const catImage = document.getElementById('cat-image');
    if (catImage) {
      catImage.onclick = () => catchCat();
      catImage.style.outline = 'none';

    }
        gameInterval = setInterval(() => {
    if (catCaughtCount < 5) {
      showCatRandom();
    } else {
      clearInterval(gameInterval);
      gameRunning = false;
    }
  }, 1500);
};

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
         clearInterval(gameInterval);
         catImage.style.display = 'none';

         /* Lägg till artefakt här, när katten är fångad 5 gånger */
       }
     }
   
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

function showCatRandom() {
  const catImage = document.getElementById('cat-image');
  const background = document.getElementById('backgroundimg');

  if (catImage && background) {

    //background size
    const backgroundSize = background.getBoundingClientRect();

    // Max position for cat within background
    const maxX = backgroundSize.width - catImage.offsetWidth;
    const maxY = backgroundSize.height - catImage.offsetHeight;

    // random position
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    catImage.style.left = `${randomX}px`;
    catImage.style.top = `${randomY}px`;
catImage.style.display = 'block';

// Hide the cat after a short delay
    setTimeout(() => {
      catImage.style.display = 'none';
      catImage.style.outline = 'none';
      catFocused = false;
    }, 1000);
  }
}

function startSetup() {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }
}

startSetup();