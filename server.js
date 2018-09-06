// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express ();
// add your server code starting here
server.use(express.json());
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ message: 'Cannot Get Data' });
        });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    db.insert(post)
        .then(res => res.status(201).json(res))
        .catch(err => res.status(500).json(err));
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(count => res.status(204).end())
        .catch(err => res.status(500).json(err));
});

server.listen(3000, () => console.log('Listening on Port 3000'));