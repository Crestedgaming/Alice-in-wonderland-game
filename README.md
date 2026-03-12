# Escape Room Game

Alice in Wonderland-inspired escape room game built as a team project in the FED25D JavaScript course.

The game contains six connected rooms with different puzzle mechanics. As players finish rooms, they collect artifact letters and progress toward the final challenge.

## Features

- Six playable rooms with separate room logic
- Room progress tracking in the footer
- Artifact letter collection across the game
- Final room challenge after completing the full sequence
- Local asset-driven gameplay and browser-based state
- Hidden cheat button allowing the player to reset the highscore
- Go back button to return to room selection without resetting progress
- Room metadata loaded from JSON for easy updates
- Accessibility improvements including extended time in Room 1 (20 seconds)
- Background music with toggle control in the header (muted by default)
- Keyboard navigation support for Room 1 and Room 4
- Continuous integration and deployment to GitHub Pages

Room order:

1. Fallet
2. Storleken
3. Gåtan
4. Kurragömma
5. Tebjudningen
6. Slutstriden

## Tech Stack

- TypeScript
- SCSS
- Vite
- HTML
- CSS

## Getting Started

Prerequisites:

- Node.js 18+ (recommended)
- npm

Install and run:

1. `npm install`
2. `npm run dev`
3. Open the URL shown by Vite (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Run TypeScript build and create production bundle
- `npm run preview`: Preview the production build locally

## Deployment

The project is set up for automatic deployment to GitHub Pages using GitHub Actions.

### Deploy automatically

Simply push to the `main` branch:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Your game will be live at: https://Medieinstitutet.github.io/fed25d-js-intro-grupparbete-shikadi-shadowstep/

The deployment workflow:

- Runs on every push to `main`
- Builds the project with `npm run build`
- Deploys the `dist/` folder to GitHub Pages
- Usually takes 1-2 minutes

## Project Structure

Core files:

- `index.html`: Main page and room containers
- `src/main.ts`: Room switching, progress, and artifact placement
- `src/footer.ts`: Shared footer/progress helpers
- `src/engine/GameState.ts`: Global game state type and state object
- `src/engine/GameManager.ts`: Shared game flow helpers

Room files:

- `src/room1/Room1_theFall.ts`
- `src/room2/Room2_Storleken.ts`
- `src/room3/Room3_the_riddle.ts`
- `src/room4/Room4_hide_and_seek.ts`
- `src/room5/room5_teaparty.ts`
- `src/room6/Room6_Slutstriden.ts`

Assets and data:

- `public/`: Room images and other static assets
- `src/data/rooms.json`: Room metadata including names and descriptions
- `src/data/artifacts.json`: Present but currently empty

## Manual Test Checklist

1. Start a new game from the landing view.
2. Complete all rooms in sequence.
3. Verify that:
   - The footer progress bar increases correctly.
   - Artifact letters appear as expected.
   - The final completion state appears after Room 6.
4. Test the "Go back" button to return to room selection.
5. Test the "Restart" button to reset the game to login screen.

## Accessibility Features

- Room 1 fall duration set to 20 seconds to allow sufficient time for players with different abilities
- Keyboard navigation in Room 1 and Room 4:
  - **Room 1**: Tab to select keys, Enter or Space to confirm
  - **Room 4**: Space to focus cat, Enter to catch it
- Background music toggle button in header with aria-labels for screen readers (muted by default)
- Clear instructions and messaging in all rooms
- Support for keyboard navigation and screen readers across the game

## Notes

- Background music ("Fairy Tale" by Freepik) plays in the background, muted by default. Use the speaker icon in the header to toggle.
- Some rooms include randomized behavior (for example shuffled letters or random positions).
- Runtime data such as Room 1 results can be stored in browser `localStorage`.
- Room names and descriptions are centralized in `src/data/rooms.json` for easy maintenance.

## Team

Built by Team `Shikadi Shadowstep`.

- Jennie Modd - <https://github.com/jenniemodd>
- Sandra Hellstrom - <https://github.com/Saandrah>
- Markus Jonsson - <https://github.com/Crestedgaming>
- Alex Truong - <https://github.com/alexminhtruong>
- Mohammed Yasin - <https://github.com/Mohammed-FE2025>
- Amanda Andersson - <https://github.com/amanda-andersson>

## Attribution

Icon and image attribution is documented in `CREDITS.md`.

## License

No license file is currently included in this branch.
