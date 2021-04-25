const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "858c33cee5f9b5bc651cd08884115771";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function(responseFromHttps){
        console.log("Response from http received !");
        console.log(responseFromHttps.statusCode);

        responseFromHttps.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            //console.log(temp);
            //console.log(weatherDescription);
            console.log(imageURL);

            res.write("<p> The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The temperature in " + query + " is " + temp + " degree Celcius </h1>");
            res.write("<img src='" + imageURL + "'>");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("Server listening on port 3000.");
});
