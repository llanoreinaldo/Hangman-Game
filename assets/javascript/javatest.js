//Delcares arrays of words and variables for game

var puzzlesRuisms = ["you better work", "bring back my girls", "snatch game", "fish eleganza", "oh no she better dont", "shantay you stay"];
var wins = 0;
var losses = 0;
var userGuess = [];
var rightLetters = [];
var wrongLetters = [];
var guessesLeft = 9
var blanks = [];
var randRu;
var winCounter = 0;




//Randomize word choice
randRu = puzzlesRuisms[Math.floor(Math.random() * puzzlesRuisms.length)];
console.log(randRu)

//Start Game Function
function startGame() {


    for (var i = 0; i < randRu.length; i++) {
        console.log(i) //Registers function in console to ensure it works
        blanks.push('_');
        console.log(blanks); //Registers function in console to ensure it works
    }

    //display's blanks on screen with added space
    document.getElementById('display-blanks').innerHTML = blanks.join(" ");

    //reset 
    wrongLetters = [];
    guessesLeft = 9;
    rightLetters = [];
    //Displays to HTML
    document.getElementById('guessLeft').innerHTML = guessesLeft;
}

//Records user guesses and matches against the random word chosen from the array

function WinLoses() {
    //counter is cutting off one short of the word... need to FIX!
    if (winCounter === randRu.length) {
        alert("You're a Winner Baby!");
        startGame();
    } else if (guessesLeft === 0) {
        alert("Sashay Away");
        startGame();
    }
}

//records user key
document.onkeydown = function (event) {

    userGuess = event.key;
    console.log(userGuess); //Registers function in console to ensure it works

    //checks the letter inside the random word 
    if (randRu.indexOf(userGuess) > -1) {
        console.log(randRu.indexOf(userGuess)); //Registers function in console to ensure it works
        
        for (var i = 0; i < randRu.length; i++) {

            if (randRu[i] === userGuess) {

                blanks[i] = userGuess;
                console.log(blanks)  //Registers function in console to ensure it works
               
                rightLetters.push(userGuess);
                console.log(rightLetters); //Registers function in console to ensure it works
               
                winCounter++;
                WinLoses();
            }
        }
    }
    // adds wrong letters to array
    else {
        wrongLetters.push(userGuess);
        guessesLeft--; //subtracts from guessesLeft counter
        console.log(guessesLeft); //Registers function in console to ensure it works
        console.log(wrongLetters); //Registers function in console to ensure it works

    }
}

/*
$(document).ready(function() {

var lettersAccepted = "abcdefghijklmnopqrstuvwxyz";
var intext = prompt ('Input 1 character');
if (lettersAccepted.search) {

}
else {

}
})
*/
