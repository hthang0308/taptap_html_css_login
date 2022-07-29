"use strict";
// Implement a game rest functionality, so that the player can make a new guess!
// Your tasks:
// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the 'score' and
// 'secretNumber' variables
// 3. Restore the initial conditions of the message, number, score and guess input
// fields
// 4. Also restore the original background color (#222) and number width (15rem)`
// step 1
const again = document.querySelector(".again");
var score = document.querySelector(".score");
var highscore = document.querySelector(".highscore");
var secretNumber = document.querySelector(".secretNumber");
var message = document.querySelector(".message");
const guess = document.querySelector(".guess");
const number = document.querySelector(".number");
function reset() {
  score.textContent = "20";
  secretNumber = generateSecretNumber();
  message.textContent = "Make your guess!";
  number.textContent = "?";
  guess.value = "";
  document.body.style.backgroundColor = "#222";
  number.style.width = "15rem";
}
const generateSecretNumber = () => {
  return Math.floor(Math.random() * 20) + 1;
};
again.addEventListener("click", () => {
  reset();
});
window.addEventListener("load", () => {
  reset();
});
document.querySelector(".check").addEventListener("click", () => {
  const guessValue = guess.value * 1;
  if (guessValue === secretNumber) {
    message.textContent = "You guessed it!";
    number.textContent = secretNumber;
    document.body.style.backgroundColor = "#00ff00";
    if (score.textContent > highscore.textContent) {
      highscore.textContent = score.textContent;
    }
    number.style.width = "30rem";
  } else if (guessValue > secretNumber) {
    message.textContent = guessValue + " is too high!";
    score.textContent = score.textContent - 1;
    guess.value = "";
  } else if (guessValue < secretNumber) {
    message.textContent = guessValue + " is too low!";
    score.textContent = score.textContent - 1;
    guess.value = "";
  } else {
    message.textContent = "Please enter a number!";
    guess.value = "";
    x;
  }
});
