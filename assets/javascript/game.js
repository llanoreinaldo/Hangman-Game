//Delcares arrays of words and variables for game

var puzzlesRuisms = ["sissy that walk", "kitty girl", "you better work", "bring back my girls", "snatch game", "drag eleganza", "oh no she better dont", "shantay you stay"],
    wins = 0,
    losses = 0,
    playGame = false,
    lettersTried = [],
    wrongLetters = [],
    guessesLeft = 8,
    themeAudio = new Audio('assets/sounds/rpdr-theme.mp3'),
    introAudio = new Audio('assets/sounds/start-your-engines.mp3'),
    wrongAudio = new Audio('assets/sounds/calm-down-beyonce.mp3'),
    rightAudio = new Audio('assets/sounds/shantay-you-stay.mp3'),
    wonAudio = new Audio('assets/sounds/you-better-work.mp3'),
    lostAudio = new Audio('assets/sounds/sashay-away.mp3'),
    tryAudio = new Audio('assets/sounds/not-today-satan.mp3'),
    finalGuessAudio = new Audio('assets/sounds/the-time-has-come.mp3'),
    underScore = [],
    randRu = '';

//DOM Declarations for hooking into
var DOMwordGuess = document.getElementById('blanks'),
    DOMwrongGuesses = document.getElementById('numGuesses'),
    DOMguessesLeft = document.getElementById('guessLeft'),
    DOMwinCounter = document.getElementById('wins'),
    DOMlossCounter = document.getElementById('losses'),
    DOMplayGame = document.getElementById('myPlay-button');




//Start Game Function
function startGame() {
    playGame = true;
    lettersTried = [];
    wrongLetters = [];
    guessesLeft = 8;
    underScore = [];
    document.getElementById('image').src = "assets/images/hangmanben9.JPG";
    document.getElementById("numGuesses").textContent = "Start Guessing";
    introAudio.play();

    //Randomize word choice
    randRu = puzzlesRuisms[Math.floor(Math.random() * puzzlesRuisms.length)];

    // Randomly loops through the random word choice
    for (var i = 0; i < randRu.length; i++) {

        //pushes blank spaces for random word if there is a space in the word
        if (randRu[i] === " ") {
            underScore.push('');
        } else {
            underScore.push("_")

        }
    }
    //Displays relevant DOM's to HTML
    DOMwordGuess.textContent = underScore.join(" ");
    DOMwrongGuesses.textContent = wrongLetters
    DOMguessesLeft.textContent = guessesLeft;

    //records user key
    document.onkeyup = function (event) {
        //checks key pressed is a valid key
        console.dir(event.key);

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            //records valid letter pressed
            userGuess(event.key)
        }
    }
}

//sets the base image for hangman game
function setImage() {
    if (guessesLeft === 7) {
        document.getElementById('image').src = "assets/images/hangmanben8.JPG";
    }
    if (guessesLeft === 6) {
        document.getElementById('image').src = "assets/images/hangmanben7.JPG";
    }
    if (guessesLeft === 5) {
        document.getElementById('image').src = "assets/images/hangmanben6.JPG";
    }
    if (guessesLeft === 4) {
        document.getElementById('image').src = "assets/images/hangmanben5.JPG";
    }
    if (guessesLeft === 3) {
        document.getElementById('image').src = "assets/images/hangmanben4.JPG";
    }
    if (guessesLeft === 2) {
        document.getElementById('image').src = "assets/images/hangmanben3.JPG";
    }
    if (guessesLeft === 1) {
        document.getElementById('image').src = "assets/images/hangmanben2.JPG";
    }
    if (guessesLeft === 0) {
        document.getElementById('image').src = "assets/images/hangmanben1.JPG";
    }
}


//adds event listener for user click to start game
DOMplayGame.addEventListener('click', startGame);


//Records user guesses and matches against the random word chosen from the array



//checks the letter inside the random word 
function userGuess(letter) {

    if (playGame && lettersTried.indexOf(letter) === -1) {
        lettersTried.push(letter);
        //checks letter inside random word choice array
        for (var i = 0; i < randRu.length; i++) {
            if (randRu[i].toLowerCase() === letter.toLowerCase()) {
                underScore[i] = letter;
                rightAudio.play()
            }
        }

        DOMwordGuess.textContent = underScore.join(' ');
        checkWrong(letter);

    } else if (lettersTried.indexOf(letter) > -1) {
        alert("Sorry henny, you already tried that letter. Pick another!")
    }
}

// Checks wrong guess letters and adds wrong letters to array
function checkWrong(letter) {
    if (underScore.indexOf(letter.toLowerCase()) === -1) {
        guessesLeft--;
        wrongLetters.push(letter);
        DOMwrongGuesses.textContent = wrongLetters.join(' ');
        DOMguessesLeft.textContent = guessesLeft;
        wrongAudio.play()
    }
    setImage()
    checkLosses()
}

//Game logic for win/losses
function Win() {

    //counter is cutting off one short of the word... need to FIX!
    if (randRu.toLowerCase() === underScore.join('').toLowerCase()) {
        playGame = false;
        wins++;
        wonAudio.play();
        DOMwinCounter = wins;
        document.getElementById('image').src = ("src", "assets/images/Winner.jpg");
    }
}

function checkLosses() {

    if (guessesLeft === 0) {
        lostAudio.play()
        losses++;
        playGame = false;
        DOMlossCounter = losses;
        document.getElementById('image').src = "assets/images/loser1.JPG";
    }
    Win()

}