const express = require('express')
// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const server = express();
const PORT = 4000;

//parsing JSON
server.use(express.json());

//endpoints

//POST
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
        .then(id => {
            if (!title || !contents) {
                res.status(400)
                    .json({ errorMessage: "Please provide title and contents for the post." })
            }
            else {
                res.status(201)
                    .json({ ...newPost, ...id })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: "There was an error while saving the post to the database" })
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
    db.findById(id)
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

//PUT
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.query;
    const updatedPost = { title, contents }
    db.update(id, updatedPost)
})

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    //hold the deleting post and return it later
    const deletedPost =
        db.findById(id)
            .then(post => {
                if (post.length > 0) {
                    res.json(post);
                }
                else {
                    res.status(404)
                        .json({ message: "The post with the specified ID does not exist." })
                }
            })

    db.remove(id)
        .then(post => {
            if (post.length > 0) {
                res.json(deletedPost);
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