// importing database and express

const db = require('./data/db.js');
const express = require('express');

// designating server port and defining server using express

const PORT = 4001;
const server = express();

// get array of posts

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'failed to get posts'})
        });
});

server.listen(PORT, err => {
    console.log(`server is still running for sure!`)
});