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
const WIN = "You Won!";
const LOW = "Low Guess!";
const HIGH = "High Guess!";
const GAME_OVER = "Number of guesses exhausted!";

checkBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keyup", (event) => {
  let { key, keyCode } = event;
  if (key === "Enter" || keyCode === 13) {
    if (!isNaN(parseInt(answerInput.value))) checkAnswer();
  }
});

againBtn.addEventListener("click", () => {
  gameOn = true;
  score = MAX_VAL;
  scoreBox.innerHTML = MAX_VAL;
  messageBox.innerHTML = "Start guessing...";
  answer = newNumber();
  answerInput.value = "1";
  numberBox.textContent = "?";
});

function checkAnswer() {
  if (!gameOn || isNaN(parseInt(answerInput.value))) return;
  let guess = parseInt(answerInput.value);
  if (guess === answer) setMessage(WIN);
  else if (guess < answer) setMessage(LOW);
  else setMessage(HIGH);
}

function setMessage(message) {
  messageBox.textContent = message;
  if (message !== WIN) {
    score--;
    if (score === 0) {
      messageBox.textContent = GAME_OVER;
      gameOn = false;
    }
  } else {
    gameOn = false;
    numberBox.textContent = parseInt(answerInput.value);
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
