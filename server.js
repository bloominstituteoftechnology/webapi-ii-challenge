// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

server.use(express.json());

// add your server code starting here


server.get('/posts', (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'The posts information could not be retrieved' })
        })
})

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'The post information could not be retrieved' })
        })
})

server.post('/posts', (req, res) => {
    const post = req.body;
    if (post.title == null || post.contents == null) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post'})
    }
    db.insert()
        .then( user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the post to the database' })
        })
})


server.listen(8000, () => console.log('API running...'))