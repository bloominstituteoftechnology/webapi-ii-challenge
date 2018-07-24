const express = require('express');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json())

// add your server code starting here


server.get('/', (req, res) => {
    res.send('Howdy howdy howdy!');
});

server.get('/posts', (req, res) => {
    db
        .find()
        .then(post => {
            res.json({ post });
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The posts information could not be retrieved." })
        });
});

server.listen(port, () => console.log('API running...'));