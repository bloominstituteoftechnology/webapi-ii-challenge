// import your node modules
const express = require('express');
const server = express();
server.use(express.json());
const port = 5000;

const db = require('./data/db.js');

// add your server code starting here

server.post('/api/posts', (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(newPost => {
      res.json(newPost);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => res.json(posts))
    .catch(error => res.status(500).json(error));
});

server.listen(port, () => {
  console.log('Hit me with your best post!');
});
