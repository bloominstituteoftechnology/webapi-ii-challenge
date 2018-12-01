// import your node modules

const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server
    .get('/api/posts', (req, res) => {
        db.find()
            .then((posts) => {
                res.json(posts);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({error: "The posts information could not be retrieved."})
            })
    })

server
    .get('/api/posts/:id', (req, res) => {
    const { id } =  req.params;
    db.findById(id)
    .then(post => {
        if (!post) {
            res
            .status(404)
            .json({error: "The post with the specified ID does not exist."})
        }
        res.json(post);
    })
    .catch(err => {
        res
            .status(500)
            .send({ error: "The post information could not be retrieved."})
    })
})

const PORT = 3333;
server.listen(PORT);                              