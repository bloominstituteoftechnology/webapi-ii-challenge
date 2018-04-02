// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

// add your server code starting here
server.get('/', function(req, res) {
    res.send({ api: 'Running...' });
});

server.post('/api/posts', function(req, res) {
    db
    .insert()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/api/posts', function(req, res) {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .update(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});




const port = 5500;
server.listen(port, () => console.log('API Running on port 5500'));