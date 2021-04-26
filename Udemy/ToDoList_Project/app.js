const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let nextItems = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options); 

    res.render("list", {kindOfDay : day, itemList: nextItems});
});

app.post("/", function(req, res){
    
    nextItem = req.body.nextItem;
    nextItems.push(req.body.nextItem);
    res.redirect("/");
    
});
 
app.listen("3000", function(){
    console.log("Server is listening on port 3000.");
});

