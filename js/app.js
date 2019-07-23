//This file contains all the event listener for the Phrase Hunter App

//Declare Global 'New Game' variable, currently is null
let newGame = null;

//When use clicks the 'Start Game' button, creates a new Game object and assign it to the global 'newGame' variable
document.getElementById("btn__reset").addEventListener("click", function(){

  newGame = new Game(); //Assign newly created Game object to 'newGame' variable
  newGame.startGame();  //Runs the 'startGame' method in the Game object to start the game

});

//When user clicks on the virtual keyboard after the start game overlay is hidden, runs the 'handleInteraction' method in the Game object to handle the game interaction
document.getElementById("qwerty").addEventListener("click", function(event){

  //Checks whether target clicked is a key in te virtual platform, if true, runs 'handleInteraction' method
  if (event.target.getAttribute("class") == "key") {

    newGame.handleInteraction(event.target,'clickType');

  }

});

//When user types on the keyboard after the start game overlay is hidden, runs the 'handleInteraction' method in the Game object to handle the game interaction
document.body.addEventListener("keyup", function(event){

  //This checks whether the input key is a lowercase alphebetical key, if true allow 'handleInteraction' method to run
  if ((event.which <= 90 && event.which >= 48 || event.which >= 96 && event.which <= 105) && (document.getElementById("overlay").style.display === "none")) {

     newGame.handleInteraction(event.key,'pressType');

  //This checks whether the input key is the capslock key, if true alert the user capslock is pressed
  }else if(event.which == 20){

    (event.getModifierState("CapsLock")) ? alert('Warning, Caps Lock is On. Game will not work!') : alert('Caps Lock is Off now. Enjoy!'); ;

  }

});


//Free Images: https://unsplash.com/photos/z40srU0ugCk (hunter)
//https://unsplash.com/photos/cFdH_t5xBxk (win)
//Changed h2 font size
//Changes all font family to font-family: 'Helvetica', 'Arial', sans-serif;
//Changes keyboard style
