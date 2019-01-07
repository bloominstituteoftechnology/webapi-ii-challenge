// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// handles get requests
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json({ posts })
        })
        .catch(error => {
            res
                .status(500)
                .json({ 
                    error: "The posts information could not be retrieved." 
                })
        });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post) {
                res
                    .status(200)
                    .json({ post })
            } else {
                res
                    .status(404)
                    .json({ 
                        message: "The post with the specified ID does not exist." 
                    })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    error: "The post information could not be retrieved."
                })
        });
});

// creates server that listens to port 5000
server.listen(5000, () => console.log('server running'));