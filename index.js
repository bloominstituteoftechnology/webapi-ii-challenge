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
            let errorMessage = 'error creating the post';

            if (err.errno === 19) {
                errorMessage = "Please provide title and contents for the post." ;
            }

            res.status(500).json({ errorMessage, err });
        })
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.title || !changes.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be modified.', err });
        })
    }
});

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post could not be removed.', err });
        })
});

server.listen(9000, () => console.log('The server is live!'));