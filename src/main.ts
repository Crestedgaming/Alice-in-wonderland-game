import "./mainstyles/main.scss";
import { startGame } from "./engine/GameManager";
import { gameState } from "./engine/GameState";

import "./room4/Room4_Kurragömma";
import "./room3/Room3_Gåtan";

/*
 * ============================================================
 * ************************Startsida***************************
 * ============================================================*/

(window as any).showRoom = function (roomId: string) {
  document.getElementById("start")!.classList.add("hidden");

  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });

  document.getElementById(roomId)!.classList.remove("hidden");
};

(window as any).goToStart = function () {
  document.querySelectorAll(".room").forEach((room) => {
    room.classList.add("hidden");
  });

  document.getElementById("start")!.classList.remove("hidden");
};