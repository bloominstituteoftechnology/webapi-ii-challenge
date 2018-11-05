const express = require('express');
const db = require('./data/db.js');
const server = express();

// ***** GET request to /api/posts: *****
// If there's an error in retrieving the posts from the database:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The posts information could not be retrieved." }

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

// ***** GET request to /api/posts/:id *****
// If the post with the specified id is not found:
// - return HTTP status code 404 (Not Found).
// - return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:
// - cancel the request.
// - respond with HTTP status code 500.
// - return the following JSON object: { error: "The post information could not be retrieved." }.

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if(post.length){
                res.json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

server.listen(9000);