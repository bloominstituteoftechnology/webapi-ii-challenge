// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            post.length > 0 ?
            res.status(200).json(post) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedPost => {
            deletedPost ?
            res.status(200).send('Post deleted.') :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be removed." })
        })
})

server.listen(9000, () => console.log('Server up & running!'));