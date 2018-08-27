const express = require('express');
const db = require('./data/db.js');
const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not get your info '})
        })
})


server.listen(3000, () => console.log('This is working'));