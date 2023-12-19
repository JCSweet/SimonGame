gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let playerTurn = false;

// Random sequence generator (Shows full game pattern)
function nextSequence() {
  playerTurn = false;
  level += 1;
  $("#level-title").html("Level " + level);
  $("#turn-order").html("Watch Carefully...");
  console.log("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for (sequence = 0; sequence < level; sequence++) {
    gameSequence(sequence);
  }
  setTimeout(function () {
    playerTurn = true;
    $("#turn-order").html("OK, Your Turn!");
  }, 500 * sequence);
  
};

// Game sequence effects
function gameSequence(sequence) {
  setTimeout(function () {
    $("#" + gamePattern[sequence])
      .fadeIn(150)
      .fadeOut(150)
      .fadeIn(150);
    playSound(gamePattern[sequence]);
  }, 500 * sequence);
};


//   Event listener on first keypress(to start game)
$("body").keypress(function () {
  if (!started) {
    setTimeout(function () {
      nextSequence();
      started = true;
    }, 500);
  }
});

//   Event listener on first click (to start game) 
$("body").click(function () {
  if (!started) {
    setTimeout(function () {
      nextSequence();
      started = true;
    }, 500);
  }
});

//   Event listener on button click
  $(".btn").click(function () {
    if (started && playerTurn) {
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
      console.log("Correct answer: " + gamePattern);
      console.log("Player's answer: " + userClickedPattern);
      if (userClickedPattern.length >= level) {
        playerTurn = false;
        checkAnswer(level);
      }
    }
  });



// Animation on user input
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// Make sound
function playSound(activeColor) {
  var colorSound = new Audio("Assets/sounds/simon/" + activeColor + ".mp3");
  colorSound.play();
};

// Check answer (Complex version - checks every input)
function checkAnswer(currentLevel) {
  var answer = true;
  for (sequence = 0; sequence < currentLevel; sequence++) {
    if (userClickedPattern[sequence] === gamePattern[sequence]) {
      answer = true;
    } else {
      console.log("Wrong 🤨");
      answer = false;
      break;
    }
  }
  if (answer === true) {
    console.log("Correct!");
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else {
    userClickedPattern = [];
    gameOver();
  }
};

// Wrong Answer
function gameOver() {
  playerTurn = false;
  var gameOverSound = new Audio("Assets/sounds/simon/wrong.mp3");
  gameOverSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").html("Game Over!");
  startOver();
}

// Reset game
function startOver() {
  playerTurn = false;
  level = 0;
  gamePattern = [];
  setTimeout(function () {
    started = false;
    $("#turn-order").html("Press Any Key to Restart");
  }, 500);
}
