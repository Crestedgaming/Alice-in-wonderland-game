import "./styles/main.scss";
import { renderRoom6 } from "./rooms/Room6_Slutstriden.ts";

const app = document.getElementById("app") as HTMLDivElement;

export function goToRoom(roomName: string) {
  app.innerHTML = ""; // clear previous room

  switch (roomName) {


    case "room6":
      renderRoom6();
      break;
  }
}