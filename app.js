// Elements
const input = document.querySelector(".input");
const tries = document.querySelector(".tries-left");
const guessed = document.querySelector(".guessed");
const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");

// Tries & Correct/Incorrect Tracking
var numTries = parseInt(tries.textContent);
var lettersGuessed = guessed.textContent;
var nCorrect = parseInt(correct.textContent); // "number" of correct
var nIncorrect = parseInt(incorrect.textContent);

// Words (And phrases of course)
const words = [
  "wedding cake",
  "supermarket",
  "shopping list",
  "firetruck",
  "swimming pool",
  "lawn mower",
  "lighthouse",
  "airplane",
  "cell phone",
  "submarine",
  "jelly beans",
  "tree house",
  "world map",
  "pillow case",
  "book",
];
var word = ""; // <-- Current word

// Init
var initTries = 10;

function newWord() {
  // Reset
  tries.textContent = initTries;
  numTries = JSON.parse(initTries);
  tries.textContent = numTries;
  lettersGuessed = "";
  guessed.textContent = "";
  // New Word and Response
  word = words[Math.floor(Math.random() * words.length)];
  let response = "_"; // Must start with a value for += to work properly
  for (i = 0; i < word.length - 1; i++) {
    if (word[i + 1] == " ") {
      response += " ";
    } else {
      response += "_";
    }
  }
  input.textContent = response;
}
newWord(); // Call once

// Functionality
addEventListener("keydown", function (event) {
  let key = event.key.toLowerCase();
  // Make sure key is valid
  if (!(key.length < 2) || !/[a-zA-Z]/.test(key)) {
    return;
  }
  if (lettersGuessed.includes(key)) {
    alert("Woops! You already guessed that, try again.");
    return;
  } else {
    // Add guessed letter no matter what
    lettersGuessed += `${key} `;
    guessed.textContent = lettersGuessed;
    // Check individual key
    if (word.includes(key)) {
      let newRes = "";
      // Replace in Response
      for (i = 0; i < word.length; i++) {
        if (input.textContent[i] == "_") {
          if (word[i] == key) {
            newRes += key;
          } else {
            newRes += "_";
          }
        } else {
          newRes += word[i];
        }
      }
      input.textContent = newRes;
      if (input.textContent == word) {
        nCorrect += 1;
        correct.textContent = nCorrect;
        setTimeout(function () {
          window.alert(
            `Congrats! You guessed the phrase "${word}" correctly with ${
              initTries - numTries
            } mistakes`
          );
          initTries-=1; // Make it harder by giving less tries
          newWord();
        }, 1000); // Timeout so DOM can be updated first
      }
    } else {
      // If not in word take away a try
      if (numTries > 1) {
        numTries -= 1;
        tries.textContent = numTries;
      } else {
        // If last try is done tell the user they lost and get a new word
        numTries -= 1;
        tries.textContent = numTries;
        nIncorrect += 1;
        incorrect.textContent = nIncorrect;
        setTimeout(function () {
          alert(`Sorry, you ran out of tries. The word was "${word}"`);
          initTries+=1; // Make it easier by giving more tries
          newWord();
        }, 1000); // Timeout so DOM can be updated first
      }
    }
  }
});

// Put the current year in footer (for the copyright)
(function () {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
})();