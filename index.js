// import your node modules
const express = require('express');
const server = express();
const PORT = 4000;
const db = require('./data/db');
server.use(express.json())
server.disable("etag");

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length) {
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
                .json({ error: "The post information could not be retrieved." })
        })
})
server.post('/api/posts', (req, res) => {
    const post = req.body;

    if (post.title && post.contents) {
        db.insert(post)
            .then(idInfo => {
                db.findById(idInfo.id)
                    .then(post => {
                        res
                            .status(201)
                            .json(post);
                    });
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "There was an error while saving the post to the database" })
            })
    } else {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
    }
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    db.update(id, updatedPost)
        .then(count => {
            if (updatedPost.title && updatedPost.contents && count) {
                db.findById(id)
                    .then(post => {
                        res
                            .status(200)
                            .json(post);
                    });
            } else if (!count && updatedPost.title && updatedPost.contents) {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            } else {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide title and contents for the post." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be modified." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let foundPost;
    db.findById(id).then(post => { foundPost = post });
    db.remove(id)
        .then(count => {
            if (count) {
                res
                    .status(200)
                    .json(foundPost);
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The post could not be removed" })
        })
})

server.listen(PORT, error => {
    if (error) console.log(error);
    console.log(`server is listening on port ${PORT}`);
});