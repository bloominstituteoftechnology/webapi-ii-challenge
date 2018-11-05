// import your node modules

const db = require('./data/db.js');

const express = require('express');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
    db .find()
        .then(posts => {
            res.json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved."})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db .findById(id)
        .then(post => {
            if(post) {
                res.status(200)
                res.json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved."})
        })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    } else {
        const { post } = req.body;
        db .insert(post)
            .then(response => {
                res.status(201)
                res.json(posts)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
           
    }
})

server.listen(4000, console.log('server is running on port 4000'));
