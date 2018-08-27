// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// configure middleware
server.use(express.json());

// configure routing
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            req.abort();
            res.status(500).json({message: 'The posts information could not be retrieved.'})
        })
})

// start the server
server.listen(5000, () => console.log('\n=== API on port 5000 ===\n'));