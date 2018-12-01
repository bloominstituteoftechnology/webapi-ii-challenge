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
                .json({message: 'failed to add new post'})
        });
    }
    else {
        res
            .status(400)
            .json({ message: 'missing title or contents'})
    }
});

// delete post

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: 'post deleted'})
            }
            else {
                res
                    .status(404)
                    .json({ message: 'could not find post'})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'failed to delete post'})
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
                        .json({ message: 'could not find post'});
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'failed to delete post'});
            });
    }
    else {
        res
            .status(400)
            .json({ message: 'missing title or contents'});
    }
});

// initiate listening

server.listen(PORT, err => {
    console.log(`server is still running for sure!`)
});