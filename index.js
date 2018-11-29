const express = require('express');

const db = require('./data/db');

const server = express();

const PORT = 4000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'failed to get posts'})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res
                    .status(404)
                    .json({message: 'post not found'})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'failed to get post'})
        })
});

server.listen(PORT, () => {
    console.log('server is running')
})