// import your node modules
const cors = require('cors');
const db = require('./data/db.js');
const express = require('express');
const server = express();
server.use(express.json());

const port = 4140;
server.listen(port, () => {
    console.log(`Port #${port}`)
})

server.use(cors())
// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        console.log(posts)
        res.json(posts)
    }).catch(err => res.status(500).json(`{ error: "The posts information could not be retrieved." }`))
})


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(404).json(`{ message: "The post with the specified ID does not exist." }`);
    }
    db.findById(id).then(post => {
        res.json(post);
    }).catch(err => res.status(500).json(`{ error: "The post information could not be retrieved." }`))
})

server.post('/api/posts', (req, res) => {
    console.log(req.body)
    const { title, contents } = req.body;
    const newPost = { title, contents };
    if (!title || !contents) {
        return res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`);
    }
    db.insert(newPost).then(post => {
        res.status(201).json(post);
    }).catch(err => res.status(500).json( `{ error: "There was an error while saving the post to the database" }`))
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents}
    if (!title || !contents) {
        return res.status(400).send(`{ errorMessage: "Please provide title and contents for the post." }`);
    }
    else if (!id) {
        return res.status(404).send(`{ message: "The post with the specified ID does not exist." }`);
    }
    db.update(id, newPost).then(post => {
        res.status(200).json(post)
    }).catch(err => res.status(500).send(`{ error: "The post information could not be modified." }`))
})

server.delete('api/posts/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).send(`{ message: "The post with the specified ID does not exist." }`);
    }
    db.remove(id)
    .then(removed => {
        res.status(202).json(removed);
    }).catch(err => res.status(500).send(`{ error: "The post could not be removed" }`))
})