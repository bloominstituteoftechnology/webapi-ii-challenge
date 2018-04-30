const express = require("express");

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
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});


server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    
    db
    .findById(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        } else {
            res.json(post[0]);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});


server.listen(5000, () => {
    console.log('server listening on port 5000');
  });