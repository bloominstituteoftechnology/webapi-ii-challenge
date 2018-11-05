// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.json('hello');
});

// get all posts

server.get('/api/posts', (req, res) => {
    db.find().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ message: 'The posts information could not be retrieved.' });
    });
});

// get posts by id 

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(id => {
            if (id.length >= 1) {
                res.status(200).json(id);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The post with the specified ID does not exist.' })
        });
});


// delete post

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(id => {
            if (id.length >= 1) {
                res.status(200).json(id);
            } else {
                res.status(404).json({ message: 'the post with the specified ID does not exist' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: '"The post could not be removed"' });
        });

});

// server listening on port

server.listen(9003, () => console.log('server is working'));

