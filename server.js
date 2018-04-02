// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here

server.get('/', (req, res) => {
    res.send({ api: 'Running.........'});
})

server.post('api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."});
        });

        if (err) {
            throw(err);
        }
});

server.post('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/api/posts', (req, res) => {
    db 
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved." })
        });
});

server.get('api/posts/:id', (req, res) => {
    const id  = req.params;
    db.findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    })
})

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));