// import your node modules 
const express = require('express');
const port = 5000;
const db = require('./data/db.js');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

server.use(express.json());

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

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params 
  db
    .findById(id)
    .then(user => {res.json(user[0])})
    .catch(error => {res.status(500).json(error);
    })
});

server.listen(port, () => {
  console.log('Hit me with your best post!');
});
