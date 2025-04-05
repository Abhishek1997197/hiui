
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("."));

const sampleCards = [
  { name: "T-Rex", type: "Carnivore", power: 80 },
  { name: "Triceratops", type: "Herbivore", power: 60 },
  { name: "Velociraptor", type: "Carnivore", power: 50 },
  { name: "Brachiosaurus", type: "Herbivore", power: 70 }
];

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
    io.to(room).emit("start", { cards: sampleCards });
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
