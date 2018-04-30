// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

server.use(express.json());

// GET for localhost running

server.get('/', (req, res) => {
    res.send('API running');    
})

// GET for entire array

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

// GET for individual post

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "Not found" })
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    });
});

// POST new posts to database

server.post('/api/posts', (req, res) => {
    const post = req.body;

    db
    .insert(post)
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
})

server.listen(3000);