let uniqueSquare;
let globalScore = 0;
const audio1 = new Audio("assets/correct.mp3");
const audio2 = new Audio("assets/wrong.mp3");
let timeOut;

window.onload = () => {
  const controls = document.querySelector("#controls");
  const message = document.createElement("p");
  message.id = "message";
  message.innerText = "Ready to Play";
  controls.appendChild(message);
  const startButton = document.createElement("button");
  startButton.innerText = "Start";
  startButton.className = "button";
  startButton.id = "button1";
  startButton.onclick = () => startGame();
  controls.appendChild(startButton);
};

function startGame() {
  cleanGame();
  hideMessage();
  uniqueSquare = Math.floor(Math.random() * 36) + 1;
  drawSquares(uniqueSquare);
  drawScore();
  changeButton();
  timeOut = setTimeout(() => {
    quitGame();
    audio2.play();
    showMessage("Time over");
  }, 3000);
}

function drawSquares(unique) {
  let r = Math.floor(Math.random() * 176) + 50;
  let g = Math.floor(Math.random() * 176) + 50;
  let b = Math.floor(Math.random() * 176) + 50;
  let random = Math.floor(Math.random() * 2);
  let difference = 5;
  if (globalScore < 5) difference = 20;
  else if (globalScore < 10) difference = 15;
  else if (globalScore < 15) difference = 13;
  else if (globalScore < 20) difference = 11;
  else if (globalScore < 25) difference = 9;
  else if (globalScore < 30) difference = 7;
  const gameBox = document.querySelector("#game-box");
  gameBox.style.display = "flex";
  for (let i = 1; i <= 36; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.style.backgroundColor = `rgb(${r},${g},${b})`;
    if (unique == i && random == 0)
      square.style.backgroundColor = `rgb(${r - difference},${g - difference},${
        b - difference
      })`;
    if (unique == i && random == 1)
      square.style.backgroundColor = `rgb(${r + difference},${g + difference},${
        b + difference
      })`;
    square.onclick = () => checkAnswer(i);
    gameBox.appendChild(square);
  }
}

function showMessage(text) {
  const message = document.querySelector("#message");
  message.style.color = "#d52a2e";
  message.style.display = "block";
  message.innerText = text;
}

function drawScore() {
  const controls = document.querySelector("#controls");
  if (controls.childNodes.length == 2) {
    const score = document.createElement("p");
    score.id = "score";
    score.innerText = "0";
    controls.insertBefore(score, controls.childNodes[0]);
  }
}

function changeButton() {
  const button1 = document.querySelector("#button1");
  button1.innerText = "Quit";
  button1.onclick = () => quitGame();
}

function quitGame() {
  cleanGame();
  const button1 = document.querySelector("#button1");
  button1.innerText = "Start";
  button1.onclick = () => restartGame();
  document.querySelector("#game-box").style.display = "none";
  clearTimeout(timeOut);
}

function cleanGame() {
  const gameBox = document.querySelector("#game-box");
  while (gameBox.hasChildNodes()) gameBox.removeChild(gameBox.firstChild);
}

function checkAnswer(answer) {
  if (answer == uniqueSquare) {
    audio1.play();
    let oldScore = document.querySelector("#score").innerText;
    let newScore = parseInt(oldScore) + 1;
    globalScore = newScore;
    document.querySelector("#score").innerText = newScore;
    clearTimeout(timeOut);
    startGame();
  } else {
    quitGame();
    audio2.play();
    showMessage("Wrong");
  }
}

function hideMessage() {
  document.getElementById("message").style.display = "none";
}

function restartGame() {
  document.getElementById("score").innerText = "0";
  globalScore = 0;
  startGame();
}
