//jshint esversion:6

const express = require("express");
const app = express();

app.get("/", function(request, response){
    console.log(request);
    response.send("<h1> Hello Shivangi! </h1>");
});

app.get("/contact", function(req, res){
    res.send("You can contact me at <strong> 9877651098 </strong>");
});

app.get("/about", function(req, res){
    res.send("This is the About page, and I'm learning about ")
});

app.listen(3000, function(){
    console.log("Listening at port 3000");
});