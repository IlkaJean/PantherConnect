var express = require("express"); // import express library
var path = require("path");
var loginAPI = require("./api/loginAPI");
var threadAPI = require("./api/threadAPI");
var forumAPI = require("./api/forumAPI");
var commentAPI = require("./api/commentAPI");
const { ensureAuthenticated}  = require('./config/auth');
const passport = require("passport");
const session = require("express-session");


var app = express(); // instance of express: manage all incoming request from users

app.use(express.json());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
var passportConfig = require("./config/passport");
passportConfig(passport);

app.get('/api/v1/hello/', (req, res) =>{
    var response = {
        "message":"greeting from node js",
        data: {
            "id": 12
        },
        arr: [12, "rrrr", {}]
    }
    response.message = 444;
    response.message = {id:12};
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

//login support
app.get('/', (req, res)=>{ //main url will be login page, server sends user to loginPage
    res.sendFile(__dirname + "/public/LoginPage.html");
})

app.delete('/api/v1/comment/:id', (req, res) =>{
    commentService.delete(req.params.id, req.user);

    var comment = commentDB.get(id);
    if(comment.user_id == user.id){
        commentDB.delete(comment.id);
    } else{
        if( user.level == "moderator" || user.level == "admin"){
            commentDB.delete(comment.id);
        } else{
            res.send({message:"GO f.. yourself"})
        }
    }
})


app.use("/api/v1/users/", loginAPI);
app.use("/api/v1/threads/", ensureAuthenticated('user'), threadAPI);
app.use("/api/v1/forums/", ensureAuthenticated('user'), forumAPI);
app.use("/api/v1/comments/", ensureAuthenticated('user'), commentAPI);


var init_db = require("./config/db_init"); //import db_init file


var server = app.listen(3001, function(){
    console.log("We started out server!!!!! Hurray!");
    init_db((res)=>{
        console.log("db_init finished with following errors:");
        console.log(res)
    })
})

var dir = path.join(__dirname, 'public')  // let node js know from where to return static content(html/css/js files)
app.use(express.static(dir));
