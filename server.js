// import your node modules
const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

server.use(helmet());
server.use(express.json());

// add your server code starting here
const sendUserError = (msg, res) => {
    res.status(422);
    res.json({ Error: msg });
    return;
  };

  let nextId = 10;

server.get('/api/posts', (req, res) => {
    req.params.posts
    db.find().then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    
    db.update(id, { title, contents }).then(posts => {
        res.status(200).json(posts);

    })
    .catch(err => res.send(err));
})

server.post('/api/posts/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents ) {
        res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`)
    };

    let msg = db.find()[db.find()-1];

    db.insert({ title, contents }).then(posts => {
        posts.push({ title, contents });
        res.status(201).json(`{Message: "Success"}`);
    })
    .catch(err => res.send(err));
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(posts => {
        res.status(204).json(posts);
    })
    .catch(err => res.send(err));
})

server.listen(8000, () => console.log('API running on port 8000'))