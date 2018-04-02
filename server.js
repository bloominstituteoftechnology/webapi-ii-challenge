// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here

server.get('/'), (req, res => {
    res.send({ api: 'Runnig............'});
});

server.post('api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."});
        });
});

server.post('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));