
const socket = io();
let room = "";

function generateRoomID() {
  return "room-" + Math.random().toString(36).substring(2, 6);
}

function createRoom() {
  room = generateRoomID();
  document.getElementById("room").value = room;
  joinRoom();
}

function joinRoom() {
  room = document.getElementById("room").value.trim();
  if (!room) return alert("Please enter a Room ID.");
  socket.emit("join", room);
  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("board").classList.remove("hidden");
  document.getElementById("roomLink").innerText = "Room Link: " + window.location.origin + "?room=" + room;
}

socket.on("start", (data) => {
  const hand = document.getElementById("hand");
  hand.innerHTML = "";
  data.cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${card.name}</strong><br>Power: ${card.power}<br>${card.type}`;
    hand.appendChild(div);
  });
});

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomFromURL = urlParams.get("room");
  if (roomFromURL) {
    document.getElementById("room").value = roomFromURL;
    joinRoom();
  }
};
