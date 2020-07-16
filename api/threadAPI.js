const express = require('express');
const router = express.Router();
const threadService = require('../service/threadService')
// const userService = require('../service/userMongoService')
const { ensureAuthenticated}  = require('../config/auth');
const passport = require('passport');
module.exports = router;

router.post('/create', (req, res) =>{
    console.log(req.body);
    var user = req.user;
    var thread = req.body;
    thread.creator_id = user.id;
    threadService.createThread(thread, (id)=>{
        if (id == undefined){
            console.log("No new user")
            res.send({message:"We could't save the thread"})
        } else{
            res.send({message:"Success", id: id})
        }
    });

})

router.get('/list/:forum_id', (req, res)=>{
    var forum_id = parseInt(req.params.forum_id);
    threadService.findThreadsFromForum(forum_id, (threads) =>{
        if (threads == undefined){
            res.send({message:"Could not find threads for forum id: "+forum_id})
        }else {
            res.send({message: "Success", threads: threads})
        }
    });
})

router.get('/:id', (req, res)=>{
    var id = parseInt(req.params.id);
    threadService.findThread(id, (thread) =>{
        if (thread == undefined){
            res.send({message:"Could not find thread for id: "+id})
        }else {
            res.send({message: "Success", thread: thread})
        }
    });
})