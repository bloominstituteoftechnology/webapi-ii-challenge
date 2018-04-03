// import your node modules 
const express = require('express');
const port = 5000;
const db = require('./data/db.js');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

server.use(morgan('dev'));
server.use(helmet());

server.use(express.json());

// add your server code starting here

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  db
    .insert(post)
    .then(newPost => {
      db
        .findById(newPost.id)
        .then(user => { res.json(user[0]) })
        .catch(error => {
          res.status(500).json(error);
        })
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
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
    .then(user => { res.json(user[0]) })
    .catch(error => {
      res.status(500).json(error);
    })
});



server.listen(port, () => {
  console.log('Hit me with your best post!');
});
