// importing database and express

const db = require('./data/db.js');
const express = require('express');

// designating server port and defining server using express

const PORT = 4001;
const server = express();

const cors = require('cors');
server.use(cors());

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

// get individual post

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post) {
                res
                    .json(post)
            }
                res
                    .status(404)
                    .json({message: 'no post found'})
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'there was an error in retrieving the post'})
        })
})

// initiate listening

server.listen(PORT, err => {
    console.log(`server is still running for sure!`)
});