// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

const PORT = 3300;

// add your server code starting here

// Listening
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)
        .then((post) => {
            if (post) {
                res.json(post);
            } else {
                res.status(404)
                .json({message: "The post with the specified ID does not exist." })
            }
            res.json(post);
        })
        .catch(err =>
            res.status(500)
            .json({ error: "The post information could not be retrieved." }))
})

server.post('/api/posts', (req, res) => {
    const post = req.body;

    if (post.title && post.contents){
        db.insert(post).then(idReturn => {
            db.findById(idReturn.id).then
            (post => {
                res.status(201).json(post);
            });
            }) .catch(err => {
                res.status(500)
                .json({error: "There was an error while saving the post to the database" })
        });
    }else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post." })
    }  
    }); 



server.listen(PORT, () => console.log(`Server is running on ${PORT}`));