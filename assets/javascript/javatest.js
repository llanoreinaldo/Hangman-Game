//Delcares arrays of words and variables for game

var puzzlesRuisms = ["sissythatwalk", "kittygirl", "youbetterwork", "bringbackmygirls", "snatchgame", "drageleganza", "ohnoshebetterdont", "shantayyoustay"];
var wins = 0;
var losses = 0;
var lettersTried = [];
var wrongLetters = [];
var guessesLeft = 9
var rightLetters = [];
var introAudio = new Audio('assets/sounds/the-time-has-come.mp3')
var wrongAudio = new Audio('assets/sounds/calm-down-beyonce.mp3');
var rightAudio = new Audio('assets/sounds/shantay-you-stay.mp3')
var wonAudio = new Audio('assets/sounds/you-better-work.mp3');
var lostAudio = new Audio('assets/sounds/sashay-away.mp3')
var tryAudio = new Audio('assets/sounds/not-today-satan.mp3')
var underScore = [];

//plays intro theme song
introAudio.play("intro")

//Randomize word choice
var randRu = puzzlesRuisms[Math.floor(Math.random() * puzzlesRuisms.length)];


//Start Game Function
function startGame() {


    function underScore() {
        for (var i = 0; i < randRu.length; i++) {
            underScore.push('_');
            //display's blanks on screen with added space
            document.getElementById('display-blanks').innerHTML = underScore.join(" ")
        }
    };

    //Displays to HTML
    document.getElementById('guessLeft').innerHTML = guessesLeft;

}

function hangmanImage() {
    var imgNumber = guessesLeft
    document.getElementById("image").setAttribute("src", "assets/images/hangmanben" + imgNumber + ".jpg")
}
//Game logic for win/losses
function WinLoses() {

    var rightCounter = 0;

    //counter is cutting off one short of the word... need to FIX!
    if (rightCounter === randRu.length) {
        wonAudio.play();
        wins++;
        document.getElementById("image").setAttribute("src", "assets/images/Winner.jpg")
    } else if (guessesLeft > 0) {
        tryAudio.play();
        startGame();
        hangmanImage()
    } else(guessesLeft === 0); {
        lostAudio.play()
        losses++;
        startGame()
    }
}

//Records user guesses and matches against the random word chosen from the array

//records user key

document.onkeydown = function (event) {

    //variables for letters pressed
    lettersTried = event.key;

    //reset 


    //checks the letter inside the random word 
    if (randRu.indexOf(lettersTried) > -1) {

        for (var i = 0; i < randRu.length; i++) {
            underScore + -"_";
        }

       // var blanks = underScore


        if (randRu[i] === lettersTried) {
            rightAudio.play()
            rightCounter++;

            blanks = lettersTried;
            blanks.push("_");
            //console.log(blanks) //Registers function in console to ensure it works

            //rightLetters.push(lettersTried);
            //  console.log(rightLetters); //Registers function in console to ensure it works

            document.getElementById('display-blanks').innerHTML = blanks;
            WinLoses();
        }

    }

    // adds wrong letters to array
    else {
        wrongLetters.push(lettersTried);
        guessesLeft--; //subtracts from guessesLeft counter
        document.getElementById('guessLeft').innerHTML = guessesLeft;
        document.getElementById('wrongGuesses').innerHTML = wrongLetters;
        WinLoses();
    }

}