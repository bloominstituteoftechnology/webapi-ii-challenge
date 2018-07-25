// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here

server.get('/', (req, res) => {
    res.status(200)
    res.send('Api running');
})

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(response => {
            res.status(200)
            res.json(response)
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })

})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db
        .findById(id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            res.status(200)
            res.json(response)
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    db
        .insert(newPost)
        .then(response => {
            res.status(201)
            res.json(response)
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body;
    const editPost = { title, contents };
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    db
        .findById(id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            db
                .update(id, editPost)
                .then(response => {
                    res.status(200)
                    res.json(response)
                })
                .catch(err => {
                    console.err(err)
                    res.status(500).json({ error: "The post information could not be retrieved." })
                })
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })




})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params


    db
        .findById(id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            db
                .remove(id)
                .then(response => {
                    res.status(200)
                    res.json(response)
                })
                .catch(err => {
                    console.err(err)
                    res.status(500).json({ error: "The post could not be removed" })
                })
        })
        .catch(err => {
            console.err(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.listen(5000, () => console.log('API is running..'));