const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json("hello")
})

server.get('/api/posts', (req, res) => {
    db.find().then(results => {
        res.status(200).json(results);
    }).catch(err => {
        res.status(500).json(err);
    });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const post = { title: title, contents: contents };
    db.insert(post).then(note => {
        res.status(200).json(note);
    }).catch(err => {
        res.status(500).json(err);
    });
});

server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db.findById(id).then(note => {
        res.status(200).json(note);
    }).catch(err => {
        res.status(500).json(err);
    });
});

server.listen(9500, () => {
    console.log('\n==> server running on port 9500 <==\n')
})