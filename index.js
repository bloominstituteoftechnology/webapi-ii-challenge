// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const port = 7000;

server.use(cors());
server.use(express.json());

server.listen(port, () => {console.log(`Server running on port ${port}`)});


server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        console.log('posts: ', posts);
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {res.status(200).json(post)
    })
    .catch(err => res.send(err));
})

server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
    res.status(201).json(newPost)
    .catch(err => res.send(err));
})

server.delete('/api/posts/:id', (req, res) => {
      const id = req.params.id;
      db.remove(id)
      res.json(id)
      .catch(err => res.send(err));
    })

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const newPost = req.body;
    db.update(id, newPost)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.send(err));
})

