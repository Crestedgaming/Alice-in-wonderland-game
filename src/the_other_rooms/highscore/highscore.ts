import "../../mainstyles/main.scss";


interface Highscore {
    name: string;
    score: number;
}

// function som visar highscore
export function displayHighscores () {
    const highscoreList = document.getElementById("highscore-list");
    if (!highscoreList) return;

    const savedScores: Highscore[] = JSON.parse(localStorage.getItem("highscores") || "[]");

    // Filtrera till unika namn med bästa score
    const uniqueScores: Highscore[] = [];
    const seenNames = new Set<string>();
    savedScores
        .sort((a, b) => a.score - b.score)
        .forEach(entry => {
            if (!seenNames.has(entry.name)) {
                uniqueScores.push(entry);
                seenNames.add(entry.name);
            }
        });

    if (uniqueScores.length === 0) {
        highscoreList.innerHTML = "<li> Ingen har spelat än 😢 </li>";
        return;
    }
    highscoreList.innerHTML = uniqueScores
        .map((entry, index) => `<li>${index + 1}. ${entry.name}: ${entry.score} poäng</li>`)
        .join("");
}

export function saveNewHighscore(finalTime: number) {
    const playerName = localStorage.getItem("playerName") || "Anonym";
    let savedScores: Highscore[] = JSON.parse(localStorage.getItem("highscores") || "[]");

    // Hitta tidigare score för spelaren
    const oldScore = savedScores.find(entry => entry.name === playerName);

    // Spara bara om det är bättre (lägre score) eller om det inte finns någon score
    if (!oldScore || finalTime < oldScore.score) {
        // Ta bort gamla poster med samma namn
        savedScores = savedScores.filter(entry => entry.name !== playerName);
        // Lägg till nya posten
        const newEntry: Highscore = { name: playerName, score: finalTime };
        savedScores.push(newEntry);
    }

    // Sortera och spara topp 10
    savedScores.sort((a, b) => a.score - b.score);
    const topTen = savedScores.slice(0, 10);
    localStorage.setItem("highscores", JSON.stringify(topTen));
}

function highScoreBtn() {
  const highScoreBtn = document.getElementById('highscore-button'); // ändrat id
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



