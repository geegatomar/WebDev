//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const { resourceLimits } = require("node:worker_threads");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// (without mongoose we had done this)
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser : true, useUnifiedTopology : true});

const itemsSchema = {
    name: String 
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Workout"
});
const item2 = new Item({
    name: "Study"
});
const item3 = new Item({
    name: "Read Book"
});

const defaultItems = [item1, item2, item3];

// this listSchema has a name and a list of items (of itemSchema)
const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/", function(req, res) {
    
    Item.find({}, function(error, foundItems){

        if(foundItems.length === 0){
            // only if the db is empty, only then we insert the default items into the db  
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully inserted default items");
                }
            });
        }
        res.render("list", {listTitle: "Today", newListItems: foundItems});
    })

});


app.post("/", function(req, res){

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({
        name: itemName
    });

    if(listName === 'Today'){
        newItem.save();
        res.redirect("/");
    }else{
        List.findOne({name : listName}, function(err, foundList){
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        });
    }

    
  
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Successfully removed item");
            }
            res.redirect("/");
        });
    } else{
        // first find that custom list, and then update and remove this element with this checkedItemId
        
    }
    
    
    
});

app.get("/:customListName", function(req, res){
    console.log(req.params.customListName);
    const customListName = req.params.customListName;
    
    // if a list with that name already exists, then just display that, else create a new one
    List.findOne({name : customListName}, function(err, foundList){
        if(err){
            console.log(err);
        }else{
            if(!foundList){
                // show existing list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                console.log("Redirecting to " + customListName);
                res.redirect("/" + customListName);
            }
            else{
                // create new list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
