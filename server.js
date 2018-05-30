// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');
const server = express();
server.use(express.json());

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db
        .insert({ title, contents })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error });
        });
});

server.listen(5000, () => console.log('server running'));