const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
}, {flexible: true});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Mango",
    review: "Pretty solid.",
    random: "This is random text to check if mongoose is flexible with schema"
  
});

//fruit.save();

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else{
        console.log(fruits);
        console.log("........................................."); 
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
        mongoose.connection.close();
    }
});

// Fruit.updateOne({_id: "6088a2abdee7302a29d2cdb2"}, {rating : "9"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated the document");
//     }
// });

// Fruit.deleteOne({name: 'Apple'}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Deleted!");
//     }
// });
