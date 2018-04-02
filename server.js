// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

const bodyParser = require('body-parser');

const port = 5000;

// add your server code starting here

server.use(bodyParser.json())

server.get('/', function(req, res) {
    res.json({ API: 'Running...'});
})

server.get('/api/posts', function(req, res) {
    
    db
    .find()
    .then (users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json.error
    })
})

server.get('/api/posts/:id', function(req, res) {
    const { id } = req.params;

    db
    .findById(id)
    .then (posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(500).json.error
    })
})

server.post('/api/posts', function(req, res) {
    
    
    
    
    const post = {
        "title": req.body.title,
        "contents": req.body.contents
    }

    console.log(post);

    db
    .insert(post)
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(error => {
        res.status(500).json.error
    })
})

server.delete('/api/posts/:id', function(req, res) {
    const { id } = req.params;

    db
    .remove({ id })
    .then(users => {
        res.status(201).json(users[id]);
    })
    .catch(error => {
        res.status(500).json.error
    })
})



server.listen(port, () => console.log('Running on port 5000'));