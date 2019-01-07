// import your node modules

const express = require('express');

const db = require('./data/db.js');

const server = express();

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.send({ posts });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post === []) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post does not exist.' });
            }
        })
        .catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log('server running'));

// add your server code starting here
