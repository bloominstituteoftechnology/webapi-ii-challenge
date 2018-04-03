const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const morgan = require('morgan');
const db = require('./data/db.js');

server.use(express.json());
server.use(morgan('dev'));

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  if(!title || !contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db
      .insert(newPost)
      .then(posts => {
        res.status(201).json(newPost);
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      });
  }
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    });
});

server.get('/api/posts/:id', (req, res) => {

  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    });
});

server.delete('/api/posts/:id', (req, res) => {

  const { id } = req.params;
  db
  .findById(id)
  .then(response => {
    post = {...response[0] };

    db
      .remove(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Please provide title and contents for the post." });
      });
  })
});

server.put('/api/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  const post = req.body;

  if(!title || !contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
  db
    .update(id, post)
    .then(postId => {
      if (postId > 0){
        db
          .findById(id)
          .then(response => {
            res.status(200).json(response[0]);
          })
      } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          };
      })
      .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." });
      })
  }
});

// add your server code starting here
const port = 3000;
server.listen(port, () => console.log('API Running on port 3000'));
