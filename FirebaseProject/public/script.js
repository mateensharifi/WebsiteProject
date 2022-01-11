//Holds all of the codes for the colors, in the order of green,blue, yellow, red
normalColors = ['008000', '008CBA', 'ffcc00', 'f44336'];
//Holds all of the lighter version of colors in the same order, changes to these when clicked
lightColors = ['#67da67', '#63d6fd', '#ffeea8', '#fd9d96', '008000', '008CBA', 'ffcc00', 'f44336'];
buttons = ["greenButton", "blueButton", "yellowButton", "redButton"];
currentSequence = [];
currentSequenceIndex = 0; //index of list of sequences. Also represents number of buttons part of chain
playerMoves = [];
playerMovesIndex = 0; //index for player moves. Also represents number of playermoves made
gameIsRunning = false;
waitTime = currentSequence*100;
//GAME CONTROL
function beginGame() {
  gameIsRunning = true;
  document.getElementById("mainTitle").innerHTML = "Game Starting weeee";
  currentSequence = [];
  currentSequenceIndex = 0;
  playerMoves = [];
  playerMovesIndex = 0;
  randomNum = parseInt(Math.random() * 4);
  repeatSequence();

  setTimeout(() => {
    console.log("waiting: "+ waitTime + "s");
    makeMove(randomNum);
  }, waitTime);

//  currentSequence[currentSequenceIndex] = randomNum;
  playerMoves=[];
  playerMovesIndex=0;
}
//Displays current sequence
function repeatSequence(){
  console.log("insideRepeatSequence, currentSequenceIndex =" + currentSequenceIndex);
  if(currentSequenceIndex!=0){
  for(let i =0; i< currentSequenceIndex+1; i++){
    changeToLightColor(currentSequence[currentSequenceIndex]);
    console.log("SequenceRepeated");
  }
}
}

//Changes color of button of buttonIndex

function makeMove(colorIndex) {

  changeToLightColor(colorIndex);
  console.log("Color Changed");
  currentSequence[currentSequenceIndex] = colorIndex;
  currentSequenceIndex++;



  console.log("current sequence is now being updated");
  console.log("current sequence at the index of" + currentSequenceIndex + " is " + currentSequence)
  playerMoves=[];
  playerMovesIndex=0;

}
//Checks whether player sequence of moves matches the computer sequence
//Current bugs
// system doesn't wait long enough for player to input answre before checking if wrong/starting new seqeuence
//following sequence doesn't include the entire sequence, only represents the new value added
function checkSeq() {
  console.log("playerMoves:");
   console.log(playerMoves);
  console.log("currentSequence:" + currentSequence);
  if(gameIsRunning==true){
  for (let i = 0; i < playerMovesIndex-1; i++) {
    console.log("lastPlayerMove: "+ playerMoves[i]);
    console.log("currentSequence: "+ currentSequence[i]);
    if (playerMoves[i] != currentSequence[i]) {
      console.log("Bruh");
      document.getElementById("mainTitle").innerHTML = "You lost. Play again!";
      gameIsRunning = false;
    }
  }
}

  //does next move
  console.log("playerMovesIndex: " +playerMovesIndex);
  console.log("currentSequenceIndex: " +currentSequenceIndex);
  if(playerMovesIndex==currentSequenceIndex){
  if (gameIsRunning == true) {
    randomNum = parseInt(Math.random() * 4);
    console.log(randomNum);
    document.getElementById("scores").innerHTML = "Current Score:" + (currentSequenceIndex);
    setTimeout(() => {
      makeMove(randomNum);
    }, currentSequenceIndex*100);
  }
}
}

//BUTTON COLOR CONTROL
function changeToLightColor(colorIndex) {
  if (gameIsRunning) {
    document.getElementById(buttons[colorIndex]).style.backgroundColor = lightColors[colorIndex];
    setTimeout(() => {
      revertColor(colorIndex);
    }, 100);
  }
}

function revertColor(colorIndex) {
  document.getElementById(buttons[colorIndex]).style.backgroundColor = normalColors[colorIndex];
}

document.getElementById("startButton").addEventListener("click", function() {
  beginGame();
});




document.getElementById("greenButton").addEventListener("click", function() {
  changeToLightColor(0);
  playerMoves[playerMovesIndex] = 0;
  playerMovesIndex++;
  console.log("playerMovesIndex: " +playerMovesIndex);
  console.log("currentSequenceIndex: " +currentSequenceIndex);

      checkSeq();


});

document.getElementById("blueButton").addEventListener("click", function() {
  changeToLightColor(1);
  playerMoves[playerMovesIndex] = 1;
  playerMovesIndex++;
//  if(playerMovesIndex==currentSequenceIndex){
      checkSeq();
//  }

  console.log(playerMoves);
});

document.getElementById("yellowButton").addEventListener("click", function() {
  changeToLightColor(2);
  playerMoves[playerMovesIndex] = 2;
  playerMovesIndex++;
//  if(playerMovesIndex==currentSequenceIndex){
      checkSeq();
//  }

  console.log(playerMoves);
});

document.getElementById("redButton").addEventListener("click", function() {
  changeToLightColor(3);
  playerMoves[playerMovesIndex] = 3;
  playerMovesIndex++;
//  if(playerMovesIndex==currentSequenceIndex){
      checkSeq();
//    }

  console.log(playerMoves);
});
