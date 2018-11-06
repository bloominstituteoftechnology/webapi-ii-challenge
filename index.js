// import your node modules

const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

// middleware

server.use(express.json())

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved.", error: err });
        })
});

server.get('/api/posts/:id', (req,res) => {
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved.", error: err });
        })
});

server.post('/api/posts', (req, res) => {
    const postData = req.body;
    db.insert(postData)
        .then(postId => {
            res.status(201).json(postId);
        })
        .catch(err => {
            res.status(500).json({ message: 'error creating post', err });
        })
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'post not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating post', err });
        })
})

server.listen(9000, () => console.log('The server is live!'));