// This is the date.js module, which we we require in our app.js file

module.exports.getDate = function (){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports.getDay = function (){
    let today = new Date();
    let options = {
        weekday: "long"
    }

    let day = today.toLocaleDateString("en-US", options);
    return day;
}

console.log(module.exports);
