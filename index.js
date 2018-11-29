const express = require('express')
// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000;

//endpoints

//POST
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
        .then(post => {
            res.status(201)
                .json({ url: '/api/posts', operation: 'POST' })
        })
})

//GET all posts
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})
//GET one post
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if (post.length > 0) {
                res.json(post);
            }
            else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get post" })
        })
});

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    // const deletedPost = db.findById(id);
    db.remove(id)
        .then(post => {
            // console.log(deletedPost)
            if (post.length > 0) {
                res.json(post);
            }
            else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: "The post could not be removed" })
        })
})

//listening
server.listen(PORT, () => {
    console.log(`server is now up and running on ${PORT}`)
})