// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(cors());

// add your server code starting here


server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            post.length > 0 ?
            res.status(200).json(post) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedCount => {
            deletedCount ?
            res.status(200).send('Post deleted.') :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be removed." })
        })
})

server.post('/api/posts', (req, res) => {
    req.body.title && req.body.contents ?
        db.insert(req.body)
        .then(addedPost => {
            db.findById(addedPost.id).then(post => res.status(201).json(post))
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    :
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
})


server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    req.body.title && req.body.contents ?
        db.update(id, req.body)
        .then(updatedCount => {
            updatedCount ?
            res.status(200).json({ message: "Post updated." }) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating post.' })
        })
    :
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
})

server.listen(9000, () => console.log('Server up & running!'))