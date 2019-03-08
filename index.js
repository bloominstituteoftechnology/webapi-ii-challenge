// Import Express
const express = require('express');

// Import db
const db = require('./data/db.js');

// Initialize Express
const server = express();

// Middleware
server.use(express.json());


// CREATE
server.post('/api/posts', (req, res) => {
    const { title, contents, created_at, updated_at } = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert({ title, contents, created_at, updated_at })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
});

// READ
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

// UPDATE
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.update(id, { title, contents })
        .then(post => {
            if(post === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
});

// DESTROY 
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if(post === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});


// Run Server
server.listen(3000, () => {
    console.log('server running');
});
