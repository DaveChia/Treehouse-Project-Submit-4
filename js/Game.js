//Object Constructor for Game, which holds the properties and methods for the Game in play

 class Game   {
  constructor() {

    this.missed = 0;  //Property to hold how many times user has chosed a letter that did not match the current Phrase object in play
    this.phrases = [new Phrase('How are you'),
                    new Phrase('Rubber duck'),
                    new Phrase('Tomato'),
                    new Phrase('Cat on your head'),
                    new Phrase('Lack of interest')];  //Property to hold an array which holds all of the Phrase object that can be randomly selected to be in play
    this.activePhrase = null; //Property to hold the current active Phrase object in play
    this.lifeElements = (document.getElementById("scoreboard").children)[0].children; //Property to hold the location of the life indicator that the player has left

  }

  //This method initates the game when user clicks on 'Start Game' Button
  startGame() {

    document.getElementById("overlay").style.display = "none";  //Hides the 'Start Game' overlay
    let currentPhrase = this.getRandomPhrase(); //Runs the local 'getRandomPhrase' method to get a random Phrase object from the Phrase pool
    this.activePhrase = currentPhrase;  //Sets the selected Phrase object as the current active Phrase object
    currentPhrase.addPhraseToDisplay(); //Runs the 'addPhraseToDisplay' method in the Phrase object to display the phrase

  }

  //This method selects a random Phrase object from the pool
  getRandomPhrase() {

    const randomNumber = 	Math.floor(Math.random() * (4 + 1));;
    return this.phrases[randomNumber];

  }

  //This method runs the interaction when the player selects a letter by 2 ways:
  //1. By clicking and selecting a letter on the virtual keyboard
  //2. By typing on the keyboard to select a letter
  handleInteraction(inputKey,handleType) {

    let checkResult;
    let checkGohead = false;

    if(handleType === 'clickType'){ //If player selected a key from the virtual keyboard

        checkResult = this.activePhrase.checkLetter(inputKey.innerText);   //Runs Phrase object 'checkletter' method to check if letter is a match with any of the phrase character, method will return a result
        inputKey.disabled = true; //Disable the virtual key in the virtual keyboard the player just clicked
        inputKey.classList.add(checkResult);  //Change the color of the key depending on the match result
        checkGohead = true; //Counter to validate whether to check for win or gameover

    }else{  //If player selected a key by typing

      checkResult = this.activePhrase.checkLetter(inputKey);  //Runs Phrase object 'checkletter' method to check if letter is a match with any of the phrase character, method will return a result

      const qwertLocation = document.getElementById("qwerty");

      //Runs through all elements of the virtual keyboard
      for(let i = 0; i < qwertLocation.children.length; i++){

        let currentChild = qwertLocation.children[i];

        for(let x = 0; x < currentChild.children.length; x++){

          if(currentChild.children[x].innerText === inputKey && currentChild.children[x].disabled === false){ //If current virtual key matches with the key user type and the virtual key has not been chosed (disabled yet)

            currentChild.children[x].classList.add(checkResult);   //Change the color of the key depending on the match result
            currentChild.children[x].disabled = true; //Disable the virtual key that is the same as the one the user typed
            checkGohead = true; //Counter to validate whether to check for win or gameover

          }

        }

      }

    }

    //Runs local 'removeLife' method if user selected key does not match any of the Phrase character, runs local 'checkforWin' method if there is a match
    (checkGohead == true) ? (checkResult==="wrong")? this.removeLife() : this.checkForWin() : null;

  }

  //This method removes a lift from the player if the key the user selected does not match with any of the phrase character
  removeLife(){

    const maxLife = 5;  //Counter for maximum amount of life the player can have
    const lifeElements = this.lifeElements; //Location of the life indicators
    this.missed ++; //Increase local property of no. of times the user missed by 1

    lifeElements[maxLife-this.missed].children[0].src = "images/lostHeart.png"; //This part changes the image of the life indicator to show life has been lost

    (this.missed === maxLife) ? this.gameOver('lose') : null ;  //If local property missed is equal to the max no. of life the player can have, run local 'gameover' method with 'lose' input, user loses game

  }

  //This method checks whether the player has won the game if the user has just selected a key that matched with any of the phrase character
  checkForWin() {

    let phraseLocation = this.activePhrase.phraseLocation.children; //Gets the location of all the phrase character element in the phrase displayed
    let winChecker = true;  //Counter to check whether the user has won the game

      //Runs through all the phrase character element displayed
      for(let i = 0 ; i < phraseLocation.length ; i++){

        //If current phrase character element has a hide class, return 'winchecker' counter as false (meaning not all characters has been guessed)
        if(phraseLocation[i].classList.contains('hide')){

          winChecker = false;
          break;

        }

    }
    //If 'winchecker' counter is true, run local 'gameOver' method with 'win' input, player has won the game
    (winChecker) ? this.gameOver('win'): null;

  }

  //This method ends the game, user can lose or win
  gameOver(inputResult){

    const startOverlayLocation = document.getElementById("overlay"); //Gets the location of the 'Start Game' overlay

    startOverlayLocation.style.display = "inline";  //Displays the 'Start Game' overlay
    startOverlayLocation.classList.remove("start","win","lose");   //Resets the 'Start Game' overlay
    startOverlayLocation.classList.add(inputResult) //Display different 'Start Game' overlay depending on user winning or losing the game
    document.getElementById("game-over-message").innerText = `You ${inputResult}!`; //Display win or lose game message

    this.resetGame(); //Runs local 'resetGame' method to reset elements of the html

  }

  //This method resets elements of the html once the game ended
  resetGame(){

    const phraseNode = this.activePhrase.phraseLocation;

    //Removes previously displayed Phrase object
    while (phraseNode.firstChild) {

        phraseNode.removeChild(phraseNode.firstChild);

    }

    this.resetThroughVirtualKeyBoard(); //Runs local method to reset the virtual keyboard

    const lifeElements = this.lifeElements;

    //Resets the life indicators
    for(let i = 0 ; i < lifeElements.length; i++){

      lifeElements[i].children[0].src = "images/liveHeart.png";

    }

  }

  //This method resets the virtual keyboard
  resetThroughVirtualKeyBoard(){

    const qwertLocation = document.getElementById("qwerty");

    for(let i = 0; i < qwertLocation.children.length; i++){

      let currentChild = qwertLocation.children[i];

      for(let x = 0; x < currentChild.children.length; x++){

        currentChild.children[x].classList.remove("wrong","chosen");
        currentChild.children[x].disabled = false;

      }

    }

  }

}
