// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require ('express'),
      server = express(),
      PORT = 4001;

// GET REQUEST FOR POSTS
server.get('/api/posts', (req, res) =>{
    db.find()
    .then((posts) =>{
        res
        .json(posts)})
    .catch( err => { 
        res
        .status(500)
        .json({
            error: "The posts information could not be retrieved."
        })})
});

// GET REQUEST FOR SINGLE POST
server.get('/api/posts/:id', (req, res) =>{
    
    const {id} = req.params;
    
    db.findById(id)
    .then(post =>{
        if (post.length !== 0){
            res
            .json(post)
    
        }
        else{
            res
            .status(404)
            .json({
                message: "The post with the specified ID does not exist."
            });
        }})
    .catch( err => {
         res
         .status(500)
         .json({
            error: "The post information could not be retrieved."
        })});
});
server.listen(PORT, () =>{
    console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
});