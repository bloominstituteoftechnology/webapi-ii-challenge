// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

// add your server code starting here

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    db
        .insert({ title, contents })
        .then(users => res.status(201).json(users))
        .catch(err => res.status(400).json({ error: "There was an error while saving the post to the database" }));
})

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));
})

server.listen(8000, () => console.log('API is running...'));
