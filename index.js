// import your node modules

const db = require('./data/db.js');
const cors = require('cors');
const express = require('express');

const server = express();
const port = 8000;
// add your server code starting here

server.use(cors());

server.get('/', (req, res) => {
    res.send('<h1>Node Express Lab</h1>')
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
    db.findById()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.send(err));
});

server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));