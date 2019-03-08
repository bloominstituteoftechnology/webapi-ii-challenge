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


// Run Server
server.listen(3000, () => {
    console.log('server running');
});
