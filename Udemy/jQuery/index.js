
for(let i = 0; i < document.querySelectorAll("button").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        console.log("clicked");
        document.querySelector("h1").classList.toggle("red");
    });
}