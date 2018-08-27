// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.error('error', err)
            res.status(500).json({errorMessage: 'Failed to retrieve data'})
        })
})

server.post("/api/posts", (req, res) => {
    const post = req.body;
    post.id = 10;
    if(!req.body || !req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    else{
        posts.push(post)
        res.status(201).json(posts);
    }
})

server.get("/api/posts/:id", (req, res) => {
   db.findById(req.params.id)
        .then(post => {
            if (post.length < 1){
                res.status(404).json({error: "The Post with the specificed ID does not exist."})
            }
            else{
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The posts information could not be retrieved."})
        })

});

server.listen(8000, () => console.log("===The server is running on port 8000==="));