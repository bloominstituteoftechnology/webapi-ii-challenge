// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.json('Hello World!');
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        res.json(post);
    }).catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
})

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
});

server.listen(3333, () => console.log('Server is listening on port 3333.'));

