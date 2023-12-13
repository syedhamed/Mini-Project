//setting event listners for instruction button

var instructionsContainer = document.getElementById('instructions-container');
var instructionsButton = document.getElementById('instructions-button');

instructionsButton.addEventListener('click', function() {
  instructionsContainer.style.display = 'block';
});

function closeInstructions() {
  instructionsContainer.style.display = 'none';
}

//initialize an array of the words , from which a random word is selected
const words = ["Canada", "javascript", "Colorcoding", "programming", "web"];

//initialize variables
let chosenWord = "";
let wordDisplay = [];
let incorrectGuesses = [];

//function to choose word from the pre-defined array
function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay = Array(chosenWord.length).fill('_');
    updateDisplay();
}

//handling user input
function makeGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    if (guess && chosenWord.includes(guess) && !wordDisplay.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                wordDisplay[i] = guess;
            }
        }
    } else if (guess && !incorrectGuesses.includes(guess)) {
        incorrectGuesses.push(guess);
        updateHangmanImage();
    }

    guessInput.value = '';
    updateDisplay();
    checkGameStatus();
}

function updateDisplay() {
    document.getElementById("word-display").textContent = wordDisplay.join(' ');
    document.getElementById("incorrect-guesses").textContent = incorrectGuesses.join(', ');
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    const stickFigureHangman = [
        "  |",
        "  O",
        " /|\\",
        " / \\",
    ];

    const hangmanRepresentation = stickFigureHangman.slice(0, incorrectGuesses.length);
    hangmanImage.textContent = hangmanRepresentation.join('\n');
}
// Logic to check if the game is won or lost
function checkGameStatus() {
    if (incorrectGuesses.length === 6) {
        alert("You lose! The word was: " + chosenWord); // game lost message
        resetGame();
    } else if (!wordDisplay.includes('_')) {
        alert("Congratulations! You guessed the word: " + chosenWord);
        resetGame();
    }
}

function resetGame() {   // Resets game state and chooses a new word
    chosenWord = "";
    wordDisplay = [];
    incorrectGuesses = [];
    updateHangmanImage();
    chooseWord();
}

// Initialize the game
chooseWord();