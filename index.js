// import your node modules
const express = require('express');
const db = require('./data/db.js');
const PORT = 4000;
// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500)
            .json({ message: "The posts information could not be retrieved." })
        })
})

server.listen(PORT);