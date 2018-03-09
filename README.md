# Hangman-Game

### INSTRUCTIONS

* For this project I used HTML, Bootstrap 4.0 (and some CSS), and Javascript to create a hangman game website that can be played on desktop as well as PC.  Below are some functionality notes:

1. The game was designed for mobile first, and then upscaled to a desktop size using media queries in CSS. Sadly, mobile and tablet views may not work because the keyboard functionality isn't designed yet.  The images used for the hangman character were created using Paint and PowerPoint.

2. There is built in audio at the start of the game, and when a right and wrong key is selected.

3. For the game logic, I used strictly javascript and no jQuery. Also, the game was coded using some JSON.

4. The game picks a random word out of a 8 word array and then checks user guesses against the randomly chosen word. After each user input, the game updates the board to show the user's guess as well as updates the blank spaces to reflect a correct guess, or the image to add parts to the hangman figure. The game will issue a final guess audio when there is one guess left.  If the user losses, a new image will pop un in the container, alongside the final hangman image.  If the user wins, win audio plays and a new image will appear in the container.
