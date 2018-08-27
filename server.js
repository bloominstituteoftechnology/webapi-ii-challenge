// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.send('Hello World');
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
})

server.listen(8000, () => console.log('API running on port 8000'));