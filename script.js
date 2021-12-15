"use strict";

const againBtn = document.querySelector(".again");
const answerInput = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const scoreBox = document.querySelector(".score");
const highScoreBox = document.querySelector(".highscore");
const messageBox = document.querySelector(".message");
const numberBox = document.querySelector(".number");

function newNumber() {
  let number = Math.floor(Math.random() * 20) + 1;
  return number;
}

let MAX_VAL = 20;
let MIN_VAL = 1;
let score = 20;
let answer = newNumber();
let gameOn = true;
let highestScore = MAX_VAL;
let firstGame = true;
answerInput.value = "1";
const WIN = "You Win!";
const LOW = "Too low!";
const HIGH = "Too high!";

checkBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keyup", (event) => {
  let { key, keyCode } = event;
  if (key === "Enter" || keyCode === 13) checkAnswer();
});

againBtn.addEventListener("click", () => {
  gameOn = true;
  score = MAX_VAL;
  scoreBox.innerHTML = MAX_VAL;
  messageBox.innerHTML = "Start guessing...";
  answer = newNumber();
  answerInput.value = "1";
  numberBox = "?";
});

function checkAnswer() {
  if (!gameOn) return;
  let guess = parseInt(answerInput.value);
  if (guess === answer) setMessage(WIN);
  else if (guess < answer) setMessage(LOW);
  else setMessage(HIGH);
  numberBox.textContent = guess;
}

function setMessage(message) {
  messageBox.textContent = message;
  if (message !== WIN) {
    score--;
  } else {
    gameOn = false;
    if (firstGame) {
      highestScore = score;
      firstGame = false;
      highScoreBox.innerHTML = score;
    } else if (score > highestScore) {
      highestScore = score;
      highScoreBox.innerHTML = score;
    }
  }
  scoreBox.textContent = score;
}