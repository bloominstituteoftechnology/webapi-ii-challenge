const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(helmet());
server.use(express.json());

let nextId = 3;

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
    })
        .catch(err => res.status(500).json({ message: "Error"}));
});

server.post('/api/posts', (req, res) => {
    const content = { id: nextId++, ...req.body } // edit for post
    posts.push(title);
    res.status(200).json(posts);
});

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const format = req.query.format || 's';

    // update user
    res.status(200).json(posts);
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(u => u.id != id);
    res.status(200).json(posts);
})

server.get('/api/posts', (req, res) => {
    const sortField = req.query.sortby || 'id';
    
    res.status(200).json(posts);
})