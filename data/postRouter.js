const express = require("express");
const db = require('./db');

const router = express.Router();

//-------------------------------------
router.get("/",(req,res)=>{
    db.find()
    .then(message=>{
        res.status(200).json(message)
})
    .catch(err=>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
//-------------------------------------
router.get("/:id",(req,res)=>{
    const messageID = req.params.id
    db.findById(messageID)
    .then(message=>{
        if(!messageID){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
        res.status(200).json(message)
    }})
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})
//-------------------------------------
router.post("/",(req,res)=>{
    const userPost = req.body;
    db.insert(userPost)
    .then(users=>{
        res.status(201).json(users)
    })
    .catch(err=>{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
})
//-------------------------------------
router.delete("/:id",(req,res)=>{
    const messageID = req.params.id
    db.remove(messageID)
    .then(message=>{
        if(!message){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            res.status(204).end()
        }
    })
    .catch(err=>{
        res.status(500).json({ error: "The post could not be removed" })
    })
})
//-------------------------------------
router.put("/:id", (req, res) => {
    const userID = (req.params.id)
    const userText = (req.body)
    db.update(userID,userText)
    .then(user => {
        if (userID && userText) {
        res.status(200).json(user);
        } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." });
    });
});
//-------------------------------------
module.exports = router;