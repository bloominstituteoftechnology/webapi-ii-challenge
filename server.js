const express = require('express');
const db = require('./data/db.js');
const port = 5000;

const server = express();
server.use(express.json());

// server code here

//POST REQUEST
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    db
        .insert({ title, contents })
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
});

// GET REQUEST
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});




server.listen(port, () => console.log(`Magic Happening on port ${port}`))