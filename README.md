# Escape Room Game

This is our Alice in Wonderland-inspired escape room game, built as a team project.
Our goal was to create something playful, a little strange, and fun to explore while practicing TypeScript, SCSS, and collaboration.

## Quick Start

1. Install dependencies:
   - `npm install`
2. Start the app:
   - `npm run dev`
3. Open the URL shown by Vite (usually `http://localhost:5173`).

## What This Project Includes

- 6 playable rooms
- Progress bar in the footer
- Artifact letters collected as you complete rooms
- Final puzzle in Room 6

Each room has its own mini challenge and personality, but they all connect into one story.

Room order:

1. Fallet
2. Storleken
3. The Riddle
4. Hide and Seek
5. Tebjudningen
6. Slutstriden

## Main Files

- `index.html`: page structure and all room sections
- `src/main.ts`: room switching, progress, and artifact placement
- `src/footer.ts`: shared progress helper functions
- `src/engine/GameState.ts`: global game state type and object
- `src/engine/GameManager.ts`: game flow helpers (start, complete, timer)

Room logic files:

- `src/room1/Room1_theFall.ts`
- `src/room2/Room2_Storleken.ts`
- `src/room3/Room3_the_riddle.ts`
- `src/room4/Room4_hide_and_seek.ts`
- `src/room5/room5_teaparty.ts`
- `src/room6/Room6_Slutstriden.ts`

## Data and Assets

- Uses local assets from `public/` (images/gifs/webp for each room)
- Uses browser localStorage for some runtime results (for example Room 1)
- No external or confidential datasets are required

Note:

- `src/data/rooms.json` exists but is currently empty
- `src/data/artifacts.json` exists but is currently empty

## Scripts

- `npm run dev`: start local development server
- `npm run build`: type-check and build production files
- `npm run preview`: preview production build locally

## Testing the Full Flow

1. Start the game from the menu.
2. Complete all rooms in order.
3. Confirm that:
   - progress bar increases
   - artifact letters appear in footer
   - final completion screen appears after Room 6

If all of that works, the full game loop works as intended.

## Technical Notes

- Randomness is used in some rooms (for example random cat position and letter shuffle).
- No fixed random seed is configured.
- Typical manual full-play test time: 10 to 60 minutes.

## Credits

Built by Team `Shikadi Shadowstep` in the FED25D JavaScript course project.

Team members:

- Jennie Modd - <https://github.com/jenniemodd>
- Sandra Hellstrom - <https://github.com/Saandrah>
- Markus Jonsson - <https://github.com/Crestedgaming>
- Alex Truong - <https://github.com/alexminhtruong>
- Mohammed Yasin - <https://github.com/Mohammed-FE2025>
- Amanda Andersson - <https://github.com/amanda-andersson>

How we worked together:

- We split work by rooms, then helped each other when someone got stuck.
- We used daily standups and retros to keep momentum and adjust plans.
- We rotated between creative roles (ideas/design) and quality roles (review/testing).

Thanks to everyone in the team for ideas, debugging sessions, and making each room feel different.

## License

No license file is currently included in this branch.

## Icon and Asset Attribution

Full icon/image attribution is documented in `CREDITS.md`.

## Reference

Original structure inspiration:
<https://raw.githubusercontent.com/social-science-data-editors/template_README/releases/README.md>
