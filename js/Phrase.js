//Object Constructor for Phrase, which holds the properties and methods for the random Phrase in play
//Constructor will receive an input 'phrase' which is the string value of the phrase which the player will guess for

 class Phrase  {
  constructor(phrase) {

    this.phrase = phrase; //sets the phrase input to be the phrase property of the Phrase object
    this.phraseArray = this.phrase.split(""); //Splits the phrase property into an array of alphobets and spaces
    this.phraseLocation = (document.getElementById("phrase").children)[0];  //Sets the html location of the phrase element to be displayed under this property

  }

  //This method displays the phrase to be guessed by the player
  addPhraseToDisplay() {

      //For each character/space in the phraseArray property...
      this.phraseArray.forEach( phraseElement => {

          let node = document.createElement("LI");  //Creates a new LI html element
          let textnode = document.createTextNode(phraseElement);  //Creates a new text html element and sets current phraseElement as the inner text

          //sets the class of the new LI element to be space if current phrase element is empty, sets to 'hide letter' + 'phrase element char' if its not empty
          (phraseElement==" ") ? node.className = "space": node.className = "hide letter "+phraseElement.toLowerCase();
          node.appendChild(textnode); //Append the created text element to the created LI element
          this.phraseLocation.appendChild(node);  //Append the appended LI element to the phraseLocation property

      });

  }

  //This method checks whether the player selected letter is part of the phrase to be guessed
  checkLetter(selectedLetter) {

    let arr = this.phraseArray;
    let checkNoMatch = 0; //Counter to check whether letter is not matched to any of the characters in the phrase to be guessed

    //Runs through all characters in the phrase
    for(let i = 0 ; i < arr.length; i++){

      //If current character is a match to the user selected alphabet, if true, show matched letter, else add 1 counter to checkNoMatch
      (arr[i].toLowerCase() == selectedLetter) ? this.showMatchedLetter(i): checkNoMatch++;

    }

    //if checkNoMatch is equal to phrase length, means no match has occured
    if(checkNoMatch === arr.length){

        return 'wrong';

    }else{

        return 'chosen';

    }

  }

  //Unhides the phrase character if player selected alphabet is a match
  showMatchedLetter(inputIndex) {

    let selectedElement = this.phraseLocation.children;
    selectedElement[inputIndex].classList.remove('hide');
    selectedElement[inputIndex].classList.add('show');

  }

}
