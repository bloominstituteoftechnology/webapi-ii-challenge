// import your node modules
const express = require('express');
const db = require('./data/db.js');
const PORT = 9000;
const cors = require('cors');

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
        .then(deletedPost => {
            deletedPost ?
            res.status(200).send('Post deleted.') :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be removed." })
        })
})

server.post('/api/posts', (req, res) => {
    if (req.body.title && req.body.contents) {
        db.insert(req.body)
        .then(addedNote => {
            db.findById(addedNote.id).then(post => res.status(201).json(post))
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(post => {
            if (post) {
                res.status(200).json({ message: `${id} was updated` });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

server.listen(PORT, () => console.log('Server up & running on port: '+ PORT))