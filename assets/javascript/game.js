//Delcares arrays of words and variables for game

var puzzlesRuisms = ["sissy that walk", "kitty girl", "you better work", "bring back my girls", "snatch game", "drag eleganza", "oh no she better dont", "shantay you stay"],
    wins = 0,
    losses = 0,
    playGame = false,
    lettersTried = [],
    wrongLetters = [],
    guessesLeft = 9,
    rightLetters = [],
    themeAudio = new Audio('assets/sounds/rpdr-theme.mp3'),
    introAudio = new Audio('assets/sounds/start-your-engines.mp3'),
    wrongAudio = new Audio('assets/sounds/calm-down-beyonce.mp3'),
    rightAudio = new Audio('assets/sounds/shantay-you-stay.mp3'),
    wonAudio = new Audio('assets/sounds/you-better-work.mp3'),
    lostAudio = new Audio('assets/sounds/sashay-away.mp3'),
    tryAudio = new Audio('assets/sounds/not-today-satan.mp3'),
    finalGuessAudio = new Audio('assets/sounds/the-time-has-come.mp3'),
    underScore = [];

//DOM Declarations for hooking into
var DOMwordGuess = document.getElementById('blanks'),
    DOMwrongGuesses = document.getElementById('numGuesses'),
    DOMguessesLeft = document.getElementById('guessLeft'),
    DOMwinCounter = document.getElementById('wins'),
    DOMlossCounter = document.getElementById('losses'),
    DOMplayGame = document.getElementById('play'),
    DOMstart = document.getElementById('Start your engines');


//plays intro theme song
themeAudio.play("intro");

//Start Game Function
function startGame() {
    playGame = true;
    introAudio.play();
    lettersTried = [];
    wrongLetters = [];
    guessesLeft = 9;
    rightLetters = [];
    underScore = [];
    document.getElementById("image").setAttribute("src", "assets/images/hangmanben9.jpg");
    document.getElementById("numGuesses").textContent = "Start Guessing";


    //Randomize word choice
    var randRu = puzzlesRuisms[Math.floor(Math.random() * puzzlesRuisms.length)];


    // Randomly loops through the random word choice
    function underScore() {
        for (var i = 0; i < randRu.length; i++) {

            //pushes blank spaces for random word if there is a space in the word
            if (randRu[i] === " ") {
                underScore.push('');
            } else {
                underScore.push("_")

            }
        }
    }
    //Displays relevant DOM's to HTML
    DOMwordGuess.textContent = underScore.join(" ");
    DOMwrongGuesses.textContent = wrongLetters
    DOMguessesLeft.textContent = guessesLeft;

}

//sets the base image for hangman game
function hangmanImage() {
    var imgNumber = guessesLeft
    document.getElementById("image").setAttribute("src", "assets/images/hangmanben" + imgNumber + ".jpg");
}

//adds event listener for user click to start game

DOMplayGame.addEventListner('click', startGame());

//Records user guesses and matches against the random word chosen from the array

//records user key
document.onkeydown = function (event) {

    //checks key pressed is a valid key
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        //records valid letter pressed
        userGuess(event.key)
    }
}

//checks the letter inside the random word 
function userGuess(letter) {

    if (playGame === true && lettersTried.indexOf(letter) === -1) {
        lettersTried.push(letter);
        //checks letter inside random word choice array
        for (var i = 0; i < randRu.length; i++) {
            if (randRu[i].tolowerCase() === letter.tolowerCase()) {
                underScore[i] = randRu[i];
                rightAudio.play()
            }
        }

        DOMwordGuess.textContent = underScore.join(" ");
        checkWrongGuess(letter);

    } else {
        //alerts user how to start a new game
        if (!playGame) {
            alert("Hello Henny! Press any key to play again")
        } else {
            alert("Sorry henny, you already tried that letter. Pick another!")
        }
    }

}

// Checks wrong guess letters and adds wrong letters to array
function checkWrongGuess(letter) {
    if (underScore.indexOf(letter.tolowerCase()) === -1 && underScore.indexOf(letter.toUpperCase()) === -1) {
        guessesLeft--;
        wrongLetters.push(letter);
        DOMwrongGuesses.textContent = wrongLetters.join(" ");
        DOMguessesLeft.textContent = guessesLeft;
        wrongAudio.play()
    }
    WinLoses()
    hangmanImage()
}

//Game logic for win/losses
function WinLoses() {

    //counter is cutting off one short of the word... need to FIX!
    if (randRu.tolowerCase() === underScore.join('').tolowerCase()) {
        playGame = false;
        wins++;
        wonAudio.play();
        DOMwinCounter = wins;
        DOMwordGuess.textContent = randRu
        document.getElementById("image").setAttribute("src", "assets/images/Winner.jpg")
    } else if (guessesLeft > 0) {
        userGuess();
        hangmanImage()
    } else(guessesLeft === 0); {
        lostAudio.play()
        losses++;
        playGame = false;
        DOMwordGuess.textContent = randRu
        DOMlossCounter = losses;
        document.getElementById("image").setAttribute("src", "assets/images/loser1.jpg")

    }
}