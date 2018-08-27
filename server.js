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
            res.status(500).json({error: 'The posts information could not be retrieved.'})
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'})
            }
        })
        .catch(err => {
            req.abort();
            res.status(500).json({error: 'The post information could not be retrieved.'})
        })
})

// start the server
server.listen(5000, () => console.log('\n=== API on port 5000 ===\n'));