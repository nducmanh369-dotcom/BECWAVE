const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("frontend")); // this shows our website

// game state (secret number)
let target = null;

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("startGame", () => {
    target = Math.floor(Math.random() * 100); // secret 0–100
    io.emit("gameStarted", { message: "Game started!" });
  });

  socket.on("guess", (value) => {
    if (target !== null) {
      let distance = Math.abs(target - value);
      io.emit("result", { guess: value, distance });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

