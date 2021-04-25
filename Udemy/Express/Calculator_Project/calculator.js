const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
}); 

app.post("/", function(req, res){
    console.log(req.body);
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    res.send("Calculated sum is " + result);
});


app.get("/bmicalculator", function(req, res){
    console.log("get : bmi calculator page rendered!");
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
    console.log("post : happened");
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let bmi = weight/(height * height);
    console.log(weight + " " + height);
    res.send("Your bmi is " + bmi);
});


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});




