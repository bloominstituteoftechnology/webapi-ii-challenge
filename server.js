// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(response => {
        if (response.length === 0 ) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(response[0])
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.post('api/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title && !content) {
        db
        .insert({ title, content })
        .then(response => {
            res.status(201).json({ id: response.id, title, bio })
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

server.listen(port, () => console.log(`Server running on ${port}`));