//Timer förslag:

let roomStart = 0;

export function startRoomTimer() {
    roomStart = Date.now();
}

export function getRoomTime() {
    return Math.floor((Date.now() - roomStart) / 1000);
}