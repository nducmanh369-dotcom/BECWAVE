const socket = io();

document.getElementById("startBtn").addEventListener("click", () => {
  socket.emit("startGame");
});

document.getElementById("guessBtn").addEventListener("click", () => {
  const val = document.getElementById("slider").value;
  socket.emit("guess", Number(val));
});

socket.on("gameStarted", (data) => {
  document.getElementById("result").innerText = data.message;
});

socket.on("result", (data) => {
  document.getElementById("result").innerText =
    `You guessed ${data.guess}. Distance: ${data.distance}`;
});
