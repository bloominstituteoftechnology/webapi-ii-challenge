// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.json(err));
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: 'No post found' })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => res.status(500).json(err));
})

server.listen(5000, () => console.log('server running'));