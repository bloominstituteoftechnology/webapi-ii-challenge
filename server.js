// import your node modules
const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());

// add your server code starting here
server.get('/', (req, res) => {
    res.send('Hello from express');
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db.insert({ title, contents })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        })
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            res.json({ user })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});



server.listen(port, () => console.log(`Server running on port ${port}`));