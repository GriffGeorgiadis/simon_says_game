// setting global variables for game
var gamePattern = []; //stores the computers pattern
var userClickedPattern = []; // stores the users pattern
var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

//function that starts the game once a key is pressed
$(document).keypress(function () {
    //starts the game if the start value is false
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//handles the user click events for the buttons
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAwnser(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

//handles the next sequence for the computer
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randNum = Math.floor(Math.random() * 4);
    var randChosenColor = buttonColors[randNum];
    gamePattern.push(randChosenColor);

    $("#" + randChosenColor).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);
}

//plays a sound when a button is press or clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//handles animations for button clicks or presses
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//checks to see if the user got the awser wright or wrong
function checkAwnser(currentLevel) {
    //checks to see if the user and computers current level is equal
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("sucess");

        //goes to the next sequence is the user and computer have the same array length
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }


}

//starts the game over if the user got the squence wrong
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}