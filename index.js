// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 3000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
    //find
    db.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(() => {
        res.status(500).json({message: 'Failed to get posts'});
    })
})

server.get('/api/posts/:id', (req, res) => {
    //findById
    const {id} = req.params;
    db.findById(id)
    .then((post) => {
        if(post) {
            res.json(post);
        }
        else {
            res.status(404).json({message: 'Post does not exist'});
        }
    })
    .catch(() => {
        res.status(500).json({message: 'Failed to get post.'});
    })
})

server.post('/api/posts', (req, res) => {
    //insert
})

server.put('/api/posts/:id', (req, res) => {
    //update
})

server.delete('/api/posts/:id', (req, res) => {
    //remove
})

server.listen(PORT, () => {
    console.log('Server is listening');
})
