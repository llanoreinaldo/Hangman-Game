//Delcares arrays of words and variables for game

var puzzlesRuisms = ["sissy that walk", "kitty girl", "you better work", "bring back my girls", "snatch game", "drag eleganza", "oh no she better dont", "shantay you stay"],
    wins = 0,
    losses = 0,
    playGame = false,
    lettersTried = [],
    wrongLetters = [],
    guessesLeft = 8,

    //Audio Files for Site
    themeAudio = new Audio('assets/sounds/rpdr-theme.mp3'),
    introAudio = new Audio('assets/sounds/start-your-engines.mp3'),
    wrongAudio = new Audio('assets/sounds/calm-down-beyonce.mp3'),
    rightAudio = new Audio('assets/sounds/shantay-you-stay.mp3'),
    wonAudio = new Audio('assets/sounds/you-better-work.mp3'),
    lostAudio = new Audio('assets/sounds/sashay-away.mp3'),
    tryAudio = new Audio('assets/sounds/not-today-satan.mp3'),
    finalGuessAudio = new Audio('assets/sounds/the-time-has-come.mp3'),
    underScore = [],
    randRu = '',

    //DOM Declarations for hooking into
    DOMwordGuess = document.getElementById('blanks'),
    DOMwrongGuesses = document.getElementById('numGuesses'),
    DOMguessesLeft = document.getElementById('guessLeft'),
    DOMwinCounter = document.getElementById('wins'),
    DOMlossCounter = document.getElementById('losses'),
    DOMplayGame = document.getElementById('myPlay-button'),
    DOMimgRight = document.getElementById('imgRight'),
    DOMimgLeft = document.getElementById('imgLeft');


//Start Game Function
function startGame() {
    playGame = true;
    lettersTried = [];
    wrongLetters = [];
    guessesLeft = 8;
    underScore = [];
    document.getElementById("numGuesses").textContent = "Start Guessing";
    introAudio.play();

    //Randomize word choice
    randRu = puzzlesRuisms[Math.floor(Math.random() * puzzlesRuisms.length)];

    // Randomly loops through the random word choice
    for (var i = 0; i < randRu.length; i++) {

        //pushes blank spaces for random word if there is a space in the word
        if (randRu[i] === " ") {
            underScore.push("&nbsp&nbsp&nbsp");
        } else {
            underScore.push("_")

        }
    }
    //Displays relevant DOM's to HTML
    DOMwordGuess.innerHTML = underScore.join(" ");;
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
        DOMimgRight.src = "assets/images/hangmanben8.JPG";
    }
    if (guessesLeft === 6) {
        DOMimgRight.src = "assets/images/hangmanben7.JPG";
    }
    if (guessesLeft === 5) {
        DOMimgRight.src = "assets/images/hangmanben6.JPG";
    }
    if (guessesLeft === 4) {
        DOMimgRight.src = "assets/images/hangmanben5.JPG";
    }
    if (guessesLeft === 3) {
        DOMimgRight.src = "assets/images/hangmanben4.JPG";
    }
    if (guessesLeft === 2) {
        DOMimgRight.src = "assets/images/hangmanben3.JPG";
    }
    if (guessesLeft === 1) {
        DOMimgRight.src = "assets/images/hangmanben2.JPG";
    }
    if (guessesLeft === 0) {
        DOMimgRight.src = "assets/images/hangmanben1.JPG";
        DOMimgLeft.src = "assets/images/loser1.JPG";
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

        DOMwordGuess.innerHTML = underScore.join(" ");
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
        setImage()
        if (guessesLeft > 1) {
            wrongAudio.play();
            Win()
        } else if (guessesLeft === 1) {
            finalGuessAudio.play();
            Win()
        } else {
            checkLosses()
        }
    }
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
    }
    Win()

}


//Keyboard for Mobile and Table versions
function mobileKeys() {

    // Here we are provided an initial array of letters.
    // Use this array to dynamically create buttons on the screen.
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var main = $("body");

    // Scans DOM tree for buttons
    var btns = main.find("#buttons");

    // DYNAMICALLY CREATE BUTTONS
    // =================================================================================

    // 1. Creates a for-loop to iterate through the letters array.
    for (var i = 0; i < letters.length; i++) {

        // Inside the loop...

        // 2. Creates a variable named "letterBtn" equal to $("<button>");
        var letterBtn = $("<button>");

        // 3. Then gives each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
        letterBtn.addClass("letter-button letter letter-button-color");

        // 4. Then gives each "letterBtn" a data-attribute called "data-letter".
        letterBtn.attr("data-letter", letters[i]);

        // 5. Then gives each "letterBtns" a text equal to "letters[i]".
        letterBtn.text(letters[i]);

        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
        btns.append(letterBtn);

    }

    // Be sure to test that your code works for this major task, before proceeding to the next one!

    // MAJOR TASK #2: ATTACH ON-CLICK EVENTS TO "LETTER" BUTTONS
    // =================================================================================

    // 7. Create an "on-click" event attached to the ".letter-button" class.
    btns.on("click", ".letter-button", function () {

        // Inside the on-click event...

        // 8. Create a variable called "MiniKey" and set the variable equal to a new div.
        var miniKey = $("<div>");

        // 9. Give each "MiniKey" the following classes: "letter".
        miniKey.addClass("letter");

        // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
        // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
        // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
        miniKey.text($(this).attr("data-letter"));

        // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
        // Again you can see we use that find, and once its found we append the item
        main.find("#display").append(miniKey);

    });
}

mobileKeys();