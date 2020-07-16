const express = require('express');
const router = express.Router();
const forumService = require('../service/forumService')
// const userService = require('../service/userMongoService')
const { ensureAuthenticated}  = require('../config/auth');
const passport = require('passport');
module.exports = router;


router.get('/list/:branch_id', (req, res)=>{
    var branch_id = parseInt(req.params.branch_id);
    forumService.findForumFromBranches(branch_id, (forums) =>{
        if (forums == undefined){
            res.send({message:"Could not find forum for branch id: "+branch_id})
        }else {
            res.send({message: "Success", forums: forums})
        }
    });
})