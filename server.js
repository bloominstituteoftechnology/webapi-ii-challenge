// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server =express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Posts Application')
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

server.get('/api/post/:id', (req, res) => {
    db.findById(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(response);
            }
        })
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert({ title, contents })
        .then(response => res.status(201).json({ title, contents }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
})

server.delete('/api/post/:id', (req, res) => {
    db.remove(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The post has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

server.put('/api/post/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(req.params.id, { title, contents })
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json({ title, contents });
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

server.listen(8000, () => console.log('API is running on port 8000'));
