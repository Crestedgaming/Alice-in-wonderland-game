import "../../mainstyles/main.scss";

interface Highscore {
    name: string;
    score: number; // 1 sek 1 poäng, minst poäng leder.
}

//dummydata för testning
const testScores: Highscore [] = [
    { name: "Alice", score: 42 },
    { name: "Gustav", score: 35 },
    { name: "Greta", score: 50 }

];

// Spara dummy dara i localStorage om det inte finns några poäng än

if (!localStorage.getItem("highscores")){
    localStorage.setItem("highscores", JSON.stringify(testScores));
}


// function som visar highscore 
function displayHighscores () {
    const highscoreList = document.getElementById ("highscore-list");
    if (!highscoreList) return; 

    const savedScores: Highscore[] = JSON.parse (localStorage.getItem("highscores")|| "[]");

   if (savedScores.length === 0) {
        highscoreList.innerHTML = "<li> Ingen har spelat än 😢 </li>";
        return;
    }

 // sortera snabbast först (lägst poäng vinner)
   const sortedScores = savedScores.sort ((player1, player2) => player1.score -player2.score);
    highscoreList.innerHTML = sortedScores 
    .map(entry =>`<li>${entry.name}: ${entry.score} sekunder</li>`)
        .join(""); 

}


function highScoreBtn() {
  const highScoreBtn = document.getElementById('highscore');
  if (highScoreBtn) {
highScoreBtn.addEventListener('click', () => {
    console.log("Visa highscore");
    document.getElementById("highscore-page")?.classList.remove("hidden");
    document.getElementById("home-page")?.classList.add("hidden");
    displayHighscores();
});
  }
}
highScoreBtn();


