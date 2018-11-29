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

const PORT = 3333;
server.listen(PORT);                              