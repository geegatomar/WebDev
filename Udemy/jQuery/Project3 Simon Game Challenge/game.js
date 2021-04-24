let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(handleButtonClick);

function handleButtonClick(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");

    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}