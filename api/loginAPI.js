// serves api for login/register functionality

const express = require('express');
const router = express.Router();
const userService = require('../service/userService')
// const userService = require('../service/userMongoService')
const { ensureAuthenticated}  = require('../config/auth');
const passport = require('passport');
module.exports = router;

router.post('/register', (req, res) =>{
    console.log(req.body);
    userService.registerUser(req.body, (id)=>{
        if (id == undefined){
            console.log("No new user")
            res.send({message:"We could't save the user"})
        } else{
            res.send({message:"Success", id: id})
        }
    })
    // res.send('{"message":"done"}')
})

router.post('/login', (req, res, next) =>{
    console.log('login')
    passport.authenticate('local',function(err, user, info) {
        console.log(info);
        console.log(err);
        if(info){
            return res.send({message:"Wrong credentials"})
        }
        if (err) { return next(err); }
        if (!user) { return next(err);}
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({message:"Success", user: req.user});
          });
        })(req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send({message: 'Success'})
});

router.get('/users', ensureAuthenticated('admin'), (req, res) =>{
    userService.getUsers((users) =>{
        if( !users){
            res.status(503).send({message:"failed"})
        } else{
            res.send(users)
        }
    });
})

router.get('/isloggedin', function(req, res) {
    if(req.user)
        res.status(200).send(req.user);
    else
        res.status(401).send({ message:'User not logged in.'});
});