
// Handling Button Press

const allDrums = document.querySelectorAll(".drum");
for(let i = 0; i < allDrums.length; i++){
    allDrums[i].addEventListener("click", function(){
        let key = this.innerHTML;
        console.log("Pressed button for " + key);
        makeSound(key);
        buttonAnimation(key);
    });
}


// Handling Key Press

document.addEventListener("keydown", function(event){
    let key = event.key;
    console.log("Pressed key for " + key);
    makeSound(key);
    buttonAnimation(key);
});


function makeSound(key){
    let sound = new Map();
    sound["w"] = "crash.mp3";
    sound["a"] = "kick-bass.mp3";
    sound["s"] = "snare.mp3";
    sound["d"] = "tom-1.mp3";
    sound["j"] = "tom-2.mp3";

    let audio = new Audio("sounds/" + sound[key]);
    audio.play();
}

function buttonAnimation(key){
    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");
    console.log("added style to " + key);
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 200);
}