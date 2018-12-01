// import your node modules
const express = require('express');
const db = require('./data/db');
const server = express();
const PORT = 4000;
const cors = require('cors')
const parser = express.json();

server.use(cors())
server.use(parser)

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
};

// add your server code starting here


/********* Get Posts *************/
server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
        });
});

/********* Get Single Post *************/
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." });
        });
});


/************* Delete Post *************/
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const foundPost = db.find(post => post.id == id);
    if (foundPost) {
        db.remove(id)
            .then(post => {
                if (post) {
                    res.json({ message: "The post was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The post could not be removed." });
            });
    }
});

/********* Update Post *************/
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const post = req.body
    console.log("post", post)
    if (!post.title || !post.contents) {
        res
            .status(400)
            .json({ message: "Please provide title and contents for the post." })
    } else {
        const newPost = post;
        const foundPost = db.find(post => post.id == id);
        console.log("foundPost:", foundPost)
        if (foundPost) {
            db.update(id, newPost)
                .then(post => {
                    console.log("post:", post)
                    if (post) {
                        db.findById(id);
                        console.log("newPost:", newPost)
                        res
                            .status(201)
                            .json(post);
                    } else {
                        res
                            .status(404)
                            .json({ message: "The post with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The post could not be modified." });
                })
            }
        }
    });


/********* Create New Post *************/
server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db.insert(post)
            .then(idInfo => {
                db.findById(idInfo.id)
                    .then(post => {
                        res.status(201).json(post);
                    });
            }).catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert user in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing title or contents" })
    }
});


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});



