// Room 3 – The Caterpillar Riddles

export function initRoom3(): void {

   // --- Get fresh DOM references every time room opens ---
   const rum3StartButton = document.getElementById("rum3-start-button") as HTMLButtonElement;
   const riddleContainer = document.getElementById("riddle-container") as HTMLDivElement;

   if (!rum3StartButton || !riddleContainer) return;

   // --- Riddle data ---
   const riddles = [
      { id: "riddle1", answer: ["människa", "människan"] },
      { id: "riddle2", answer: ["solen", "sol"] },
      { id: "riddle3", answer: ["dammråtta"] }
   ];

   let currentRiddle = 0;
   let correctAnswers = 0;

   // -----------------------------
   // Show specific riddle
   // -----------------------------
   function showRiddle(index: number): void {
      riddles.forEach(r => {
         const el = document.getElementById(r.id);
         if (el) el.classList.add("hidden");
      });

      const active = document.getElementById(riddles[index].id);
      if (active) active.classList.remove("hidden");
   }

   // -----------------------------
   // Start room
   // -----------------------------
   function startRiddle(): void {
      rum3StartButton.classList.add("hidden");
      riddleContainer.classList.remove("hidden");
      currentRiddle = 0;
      correctAnswers = 0;
      showRiddle(0);
   }

   // -----------------------------
   // Normalize player input
   // -----------------------------
   function normalize(text: string): string {
      return text
         .trim()
         .toLowerCase()
         .replace(/[.,!?]/g, "");
   }

   // -----------------------------
   // Check answer
   // -----------------------------
   function checkAnswer(index: number): void {

      const riddleEl = document.getElementById(riddles[index].id)!;
      const input = riddleEl.querySelector("input") as HTMLInputElement;

      const playerAnswer = normalize(input.value);

      const isCorrect = riddles[index].answer.some(a => normalize(a) === playerAnswer);

      if (isCorrect) {
         correctAnswers++;
         riddleEl.classList.add("correct");
      } else {
         riddleEl.classList.add("wrong");
      }

      currentRiddle++;

      if (currentRiddle < riddles.length) {
         showRiddle(currentRiddle);
      } else {
         finishRoom3();
      }
   }

   // -----------------------------
   // Decide artifact (REAL vs FAKE)
   // -----------------------------
   function finishRoom3(): void {

      let letter: string;
      let message: string;

      if (correctAnswers >= 2) {
         letter = "k"; // REAL LETTER
         message = "🐛 Larven blåser en perfekt rökring... 'Du börjar förstå vem du är.'";
      } else {
         letter = "Q"; // FAKE LETTER
         message = "🐛 Larven ler snett... 'Rätt och fel är bara ord.'";
      }

      giveArtifact(letter);

      riddleContainer.innerHTML = `
      <div class="riddle-result">
        <h3>${message}</h3>
        <p>Du får en bokstav: <b>${letter}</b></p>
        <button id="room3-continue">Gå vidare</button>
      </div>
    `;

      document.getElementById("room3-continue")!
         .addEventListener("click", () => {
            (window as any).showRoom("rum4");
         });
   }

   // -----------------------------
   // Artifact hook (connect later)
   // -----------------------------
   function giveArtifact(letter: string): void {
      console.log("Artifact received:", letter);

   }

   // -----------------------------
   // Event listeners
   // -----------------------------
   rum3StartButton.addEventListener("click", startRiddle);

   riddles.forEach((_, i) => {
      const btn = document.getElementById(`submit${i + 1}`);
      btn?.addEventListener("click", () => checkAnswer(i));
   });
}