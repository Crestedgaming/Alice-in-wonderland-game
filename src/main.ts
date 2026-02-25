import "./mainstyles/main.scss";
import "./room4/Room4_Kurragömma";

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