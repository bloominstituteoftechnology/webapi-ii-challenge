// import your node modules
const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.send("<h2>Hello Welcome to Yusuf's Server</h2>")
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json(posts)
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The posts information could not be retrieved.", error: error })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params

    db.findById(id)
        .then(post => {
            if (post) {
                res
                    .status(200)
                    .json(post)
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The post information could not be retrieved.", error: error })
        })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert({ title, contents })
        .then(post => {
            res
                .status(201)
                .json(post)
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "There was an error while saving the post to the database", error: error })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(post => {
            if (post) {
                res
                    .status(200)
                    .json(post)
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The post could not be removed", error: error })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    const changes = { title, contents }
    db.update(id, changes)
        .then(post => {
            if (post) {
                res
                    .status(200)
                    .json({ message: `${post} posts updated` })
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The post information could not be modified.", error: error })
        })
})

server.listen(8000, () => console.log('server is alive'));