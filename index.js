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
    db .findById(id)
        .then(posts => {
            if(posts.id) {
                res.status(200)
                res.json(posts)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved."})
        })
})
