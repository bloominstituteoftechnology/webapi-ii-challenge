// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

server.get('/', (req, res) => {
    res.send('API running');    
})

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

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})

server.listen(3000);