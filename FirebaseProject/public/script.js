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
waitTime = currentSequence * 100;
currentScore = 0;
currentHighScore = window.localStorage.myHighScore;
let displace = 0;
let right = 1;
console.log("currentHighScore"+ currentHighScore);
//GAME CONTROL

if(window.localStorage.myHighScore!=undefined){
    document.getElementById("highScore").innerHTML = "Your High Score: "+ currentHighScore;
} else{
  window.localStorage.myHighScore=0;
  currentHighScore = 0;
  document.getElementById("highScore").innerHTML="Your High Score: 0";

}
function drawArt(ctx){
  ctx.beginPath();
  ctx.save();
  ctx.arc(displace,0,150,0.75*Math.PI,1.75*Math.PI);
  ctx.moveTo(150*Math.cos(0.75*Math.PI)+displace ,150*Math.sin(0.75*Math.PI)-10 );
  ctx.lineTo(170*Math.cos(1.75*Math.PI)+displace ,170*Math.sin(1.75*Math.PI));
  ctx.lineTo(170*Math.cos(1.75*Math.PI)+displace+60 ,170*Math.sin(1.75*Math.PI));
  ctx.lineTo(-250*Math.cos(1.75*Math.PI)+60+displace ,-250*Math.sin(1.75*Math.PI));
  ctx.lineTo(150*Math.cos(0.75*Math.PI)+displace ,150*Math.sin(0.75*Math.PI)-10 );
  ctx.moveTo(-150*Math.cos(1.75*Math.PI)+60+displace ,-150*Math.sin(1.75*Math.PI));
  ctx.lineTo(-150*Math.cos(1.75*Math.PI)+250+displace ,-150*Math.sin(1.75*Math.PI));
  ctx.lineTo(140*Math.cos(1.75*Math.PI)+60+displace ,140*Math.sin(1.75*Math.PI));
  ctx.restore();

  ctx.save();
  let time = new Date();
  let displacement = (Math.random()*time.getSeconds());
  ctx.rotate(Math.PI/180*displace*40);
  ctx.moveTo(-70*Math.cos(0.75*Math.PI)-30+displace , -70*Math.sin(0.75*Math.PI)-80+displacement);
  ctx.arc(-70*Math.cos(0.75*Math.PI)-30+displace ,-70*Math.sin(0.75*Math.PI)-50+displacement ,30,0.5*Math.PI,1.5*Math.PI);

  ctx.restore();
  if(displace > 180){
    right = -1;
  }
  if(displace < -180){
    right = 1;
  }
  displace += right;
  ctx.stroke();
}
function draw(){
  var ctx = document.getElementById('canvas').getContext('2d');
   ctx.clearRect(0, 0, 900, 700);
   ctx.fillStyle = 'rgba(255, 10, 255, 1)';
  ctx.strokeStyle = 'rgba(255, 10, 255, 0.4)';
ctx.globalCompositeOperation = 'destination-over';

  ctx.save();
  ctx.lineWidth = 6;
  ctx.translate(450, 250);
  drawArt(ctx);
  ctx.restore();
  window.requestAnimationFrame(draw);
}
function beginGame() {

  gameIsRunning = true;
  currentScore=0;
  document.getElementById("mainTitle").innerHTML = "Game Starting weeee";
  currentSequence = [];
  currentSequenceIndex = 0;
    document.getElementById("scores").innerHTML = "Current Score:" + (currentScore);
  playerMoves = [];
  playerMovesIndex = 0;
  randomNum = parseInt(Math.random() * 4);

  setTimeout(() => {
    makeMove(randomNum);
  }, waitTime);

  //  currentSequence[currentSequenceIndex] = randomNum;
  playerMoves = [];
  playerMovesIndex = 0;
}


function sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

//Displays current sequence
// async function repeatSequence() {
//   currentSequenceIndex = currentSequence.length;
//   console.log("insideRepeatSequence, currentSequenceIndex =" + currentSequenceIndex);
//   if (currentSequenceIndex != 0) {
//     for (let i = 0; i < currentSequenceIndex; i++) {
//       await sleep(2000);
//       changeToLightColor(currentSequence[i])
//       console.log("changing color: " + currentSequence[i]);
//     }
//   }
// }


function delay(value) {
  for(i = 0; i < (10000*value); i++) {
      console.log("x");
  }
}

//Changes color of button of buttonIndex

function makeMove(colorIndex) {
  //repeatSequence();

  setTimeout(() => {
    changeToLightColor(colorIndex);
    currentSequence.push(colorIndex);
  }, 200);

  playerMoves = [];
  playerMovesIndex = 0;

}

function isMoveCorrect() {
  for (i = 0; i < playerMoves.length; i++) {
    if (playerMoves[i] != currentSequence[i]) {
      return false;
    }
  }
  console.log("Current Score increasing, it is now:" + currentScore);

  return true;

}

function updateHighScore(){
  console.log("CURRENT HIGH SCORE IS" + currentHighScore);
  //console.log("CURRENT SCORE IS " + currentScore);
document.getElementById("highScore").innerHTML = " High Score: " + window.localStorage.myHighScore;
  if(currentScore> currentHighScore){
    currentHighScore=currentScore;
    window.localStorage.myHighScore= currentScore;
    document.getElementById("highScore").innerHTML = " High Score: " + window.localStorage.myHighScore;
  }
}
//Checks whether player sequence of moves matches the computer sequence
//Current bugs
// system doesn't wait long enough for player to input answre before checking if wrong/starting new seqeuence
//following sequence doesn't include the entire sequence, only represents the new value added
function checkSeq() {
  if(gameIsRunning){
  console.log("playerMoves:");
  console.log(playerMoves);
  console.log("currentSequence:" + currentSequence);
  playerMovesIndex = playerMoves.length;
  currentSequenceIndex = currentSequence.length;

  if (playerMovesIndex < currentSequenceIndex && isMoveCorrect()) {
    console.log("game is not done.");

    return;
  }

  if (gameIsRunning == true) {
    isSequenceMatching = playerMoves.toString() === currentSequence.toString()

    if (!isSequenceMatching) {
      console.log("Bruh");

      document.getElementById("mainTitle").innerHTML = "You lost. Play again!";
      gameIsRunning = false;
      return;
    }
  }
    currentScore++;
  updateHighScore();



  //does next move

  console.log("playerMovesIndex: " + playerMovesIndex);
  console.log("currentSequenceIndex: " + currentSequenceIndex);
  if (playerMovesIndex == currentSequenceIndex) {
    if (gameIsRunning == true) {
      randomNum = parseInt(Math.random() * 4);
      console.log(randomNum);
      document.getElementById("scores").innerHTML = "Current Score:" + (currentSequenceIndex);
      setTimeout(() => {
        makeMove(randomNum);
      }, currentSequenceIndex * 100);
    }
  }
  cheat();

}
}
//Only used for testing
function cheat() {
  colorMap = new Map([
    [0, "Green"],
    [1, "Blue"],
    [2, "Yellow"],
    [3, "Red"]
  ]);
  cheatArray = [];
  for( i = 0; i < currentSequence.length; i++) {
    cheatArray.push(colorMap.get(currentSequence[i]));
  }
  console.log("cheat: " + cheatArray);
}

//BUTTON COLOR CONTROL
function changeToLightColor(colorIndex) {
  if (gameIsRunning) {
    document.getElementById(buttons[colorIndex]).style.backgroundColor = lightColors[colorIndex];
    setTimeout(() => {
      revertColor(colorIndex);
    }, 190);
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
  playerMoves.push(0);
  console.log("playerMovesIndex: " + playerMovesIndex);
  console.log("currentSequenceIndex: " + currentSequenceIndex);

  checkSeq();


});

document.getElementById("blueButton").addEventListener("click", function() {
  changeToLightColor(1);
  playerMoves.push(1);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //  }

  console.log(playerMoves);
});

document.getElementById("yellowButton").addEventListener("click", function() {
  changeToLightColor(2);
  playerMoves.push(2);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //  }

  console.log(playerMoves);
});

document.getElementById("redButton").addEventListener("click", function() {
  changeToLightColor(3);
  playerMoves.push(3);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //    }

  console.log(playerMoves);
});
draw();
