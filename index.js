// importing database and express

const db = require('./data/db.js');
const express = require('express');

// designating server port and defining server using express

const PORT = 4001;
const server = express();

// use cors middleware to connect server to react app

const cors = require('cors');
server.use(cors());

// use parser middleware

const parser = express.json();
server.use(parser );

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
                .json({message: "The posts information could not be retrieved."})
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
                    .json({message: "The post with the specified ID does not exist."})
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "The post information could not be retrieved." })
        });
});

// create new post

server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents) {
        db.insert(newPost)
        .then(idInfo => {
            db.findById(idInfo.id)
                .then(user => {
                res
                    .status(201)
                    .json(user);
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "There was an error while saving the post to the database."})
        });
    }
    else {
        res
            .status(400)
            .json({ message: "Please provide title and contents for the post."})
    }
});

// delete post

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "The post was deleted."})
            }
            else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "The post could not be removed."})
        });
});

// update existing post

server.put('/api/posts/:id', (req, res) => {
    const updatedPost = req.body;
    const { id } = req.params;
    if (updatedPost.title && updatedPost.contents) {
        db.update(id, updatedPost)
            .then(count => {
                if (count) {
                    db.findById(id)
                        .then(user => {
                            res.json(user)
                        });
                }
                else {
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: "The post information could not be modified."});
            });
    }
    else {
        res
            .status(400)
            .json({ message: "Please provide title and contents for the post."});
    }
});

// initiate listening

server.listen(PORT, err => {
    console.log(`Server is running on ${PORT}`)
});