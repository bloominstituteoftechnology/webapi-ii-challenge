// import your node modules

const express = require('express');
const db = require('./data/db.js');

const server = express();     //express is a function
const PORT = 5000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts);      //implicit status(200)
    })
    .catch(err => {
        res 
        .status(500)
        .json({message: "failed to get posts list"})
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then((post) => {
        if(post){
            res.json(post);
        } else {
            res 
            .status(404)
            .json({message: "This Post does not exist"})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({message: "Failed to get that specific post"});
    })
});


// listening

server.listen(PORT, () => {
    console.log(`server on localhost:5000 is up and running on port ${PORT}`)
})