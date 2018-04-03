// import your node modules
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./data/db.js');
const fs = require('fs');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(error => {
        res.status(500).json(error);
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        res.json(post);
    }).catch(error => {
        res.status(500).json(error);
    });
});

server.post('/api/posts/', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    if(!title) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a title' });
        return;
    }
    if(!contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide contents' });
        return;
    }
    db.insert(req.body).then(post => {
        res.json(post)}).catch(error => {
            res.json(error)});
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const contents = req.body.contents;
    if(!title && !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'What do you want to change?' });
        return;
    }
    db.update(id, req.body).then(post => {
        res.json(post)}).catch(error => {
            res.json(error)});
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(() => {
        res.json(id);
    }).catch(error => {
        res.json(error);
    })
})


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));