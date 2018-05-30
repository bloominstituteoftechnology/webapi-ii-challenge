// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: `http://localhost:${port}`}));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// add your server code starting here
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) sendUserError(400, 'Please provide title and contents for the post.', res);
    db.insert({ title, contents })
        .then(response => {
            res.status(201).json( response );
        })
        .catch(err => {
            console.log(err);
            sendUserError(500, "There was an error while saving the post to the database", res);
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
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            res.json({ user })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.put('/api/posts/:id', (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    db.update(id, { title, content })
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.listen(port, () => console.log(`Server running on port ${port}`));