// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

//bodyParser middleware
const bodyParser = require('body-parser');
const server = express();

//use middleware
server.use(bodyParser.json());


server.get('/api/posts', (req, res) => {
    return db.find()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

server.get('/api/posts/:id', (req, res) => {
    const user = db.findById(req.params.id);

    return user
    .then(response => 
        {
        if (response.length!==0) {
            res.status(200).json(response)
        } else {
            res.status(404).send({ message: "The post with the specified ID does not exist." })
        }}
    ) 
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

server.post('/api/posts', (req, res) => {
    if (!('contents' in req.body) || !('title' in req.body)) {
        return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    return db.insert(req.body)
    .then(response => res.status(201).json(req.body))
    .catch(error => res.status(500).send({ error: "There was an error while saving the post to the database" }))
})

server.delete('/api/posts/:id', (req, res) => {
    let deleted;
    db.findById(req.params.id)
    .then(response => deleted = response)

    const request = db.remove(req.params.id)
    return request
    .then(response => res.status(200).json(deleted))
    .catch(error => res.status(500).send(error))
})

server.listen(8000, () => console.log('API running on port 8000'));