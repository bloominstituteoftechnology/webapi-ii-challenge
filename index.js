// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res
        .status(500).json({message: "The posts information could not be retrieved foo" })
    })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {res.status(200).json(post)}
    })
    .catch(err => {
        res
        .status(500).json({ error: "The post information could not be retrieved." })
    })
})
// add your server code starting here

server.listen(9000, () => console.log("Wussup Buttercup"));