// import your node modules
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

server.listen(9000);