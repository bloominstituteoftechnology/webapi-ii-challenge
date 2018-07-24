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

server.get('/posts', (req, res) => {
    req.params.posts
    db.find().then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/posts/:id', (req, res) => {
    const id = req.params.id
    db.findById(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    db.update(id, post).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.post('/posts/', (req, res) => {
    const { id, title, contents, created_at, updated_at } = req.body;
    // newContent.id = nextId++;
    // if (!title || !contents ) {
    //     return sendUserError(
    //         `{ errorMessage: "Please provide title and contents for the post." }`, res
    //     );
    // };

    db.insert({ id, title, contents, created_at, updated_at }).then(posts => {
        posts.push({ id, title, contents, created_at, updated_at });
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    db.remove().then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})


server.listen(8000, () => console.log('API running on port 8000'))