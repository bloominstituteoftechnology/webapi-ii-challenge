// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => res.send(err));
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.
    findById(id)
    .then()
    .catch()
});
server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    db
    .insert({title, contents})
    .then(res => {
        res.send(res);
    })
    .catch(err => res.send(err));
});

// add your server code starting here
const port = 8000
server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));