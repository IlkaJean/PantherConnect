var express = require("express"); // import express library
var path = require("path");


var app = express(); // instance of express: manage all incoming request from users

app.use(express.json());
app.get('/api/v1/hello/', (req, res) =>{
    var response = {
        "message":"greeting from node js",
        "data": {
            "id": 12
        }
    }
    res.send(response)
}) // create an end-point (first param is address) address handled by function(greeting) address door to server


app.get('/api/v1/hellononlambda/', greeting)
function greeting(req, res){
    var response = {
        "message":"greeting not from lambda"
    };
    console.log("Here I am, not lambda function");
    res.send(response);
}

app.get('/', (req, res)=>{ //main url will be login page, server sends user to loginPage
    res.sendFile(__dirname + "/public/LoginPage.html");
})

var server = app.listen(3001, function(){
    console.log("We started out server!!!!! Hurray!")
})

var dir = path.join(__dirname, 'public')  // let node js know from where to return static content(html/css/js files)
app.use(express.static(dir));
