const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService')
// const userService = require('../service/userMongoService')
const { ensureAuthenticated}  = require('../config/auth');
const passport = require('passport');
module.exports = router;

router.post('/create', (req, res) =>{
    console.log(req.body);
    var user = req.user;
    var comment = req.body;
    comment.creator_id = user.id;

    commentService.createComment(comment, (id)=>{
        if (id == undefined){
           
            res.send({message:"We could't save the comment"})
        } else{
            res.send({message:"Success", id: id})
        }
    });

})

router.get('/list/:thread_id', (req, res)=>{
    var thread_id = parseInt(req.params.thread_id);
    commentService.findCommentsFromThread(thread_id, (comments) =>{
        if (comments == undefined){
            res.send({message:"Could not find threads for forum id: "+thread_id})
        }else {
            res.send({message: "Success", comments: comments})
        }
    });
})