// import your node modules
const express = require('express');
const helmet = require ('helmet');
const server = express();
const port = 8000;
const db = require('./data/db.js');

server.use(helmet());
server.use(express.json());

// add your server code starting here
server.listen(port, () => console.log(`Server is listening on port ${port}`))

server.get('/api/posts', (req, res) => {
    db.find().then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(p => {
        if(p.length === 0) {
         res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        res.end();
    }
    db.insert({ title, contents }).then(p => {
        res.status(201).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(p => {
        if(!p) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})