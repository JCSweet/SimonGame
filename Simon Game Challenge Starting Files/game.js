gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


// Random sequence generator (Complex version - shows full game pattern)
function nextSequence() {
  level += 1;
  $("#level-title").html("Repeat The Sequence<br>Level " + level);
  console.log("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for (sequence = 0; sequence < level; sequence++) {
    gameSequence(sequence);
  }
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

//   Event listener on first keypress (to start game)
$("body").keypress(function () {
  if (!started) {
    setTimeout(function () {
      nextSequence();
      started = true;
    }, 500);
  }
});

//   Event listener on button click
$(".btn").click(function () {
  if (started) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    console.log("Correct answer: " + gamePattern);
    console.log("Player's answer: " + userClickedPattern);
    if (userClickedPattern.length >= level) {
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
  var colorSound = new Audio("sounds/" + activeColor + ".mp3");
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
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").html("Game Over!<br>Press Any Key to Restart");
  startOver();
}

// Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  setTimeout(function () {
    started = false;
  }, 1000);
}
