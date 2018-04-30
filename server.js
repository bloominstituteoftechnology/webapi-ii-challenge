// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved."})
    })
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
