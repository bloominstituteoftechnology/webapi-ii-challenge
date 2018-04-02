const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;

const db = require('./data/db.js');

/// GET
server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: 'error' });
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
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    });
});

/// POST
let posts = [];
let idCounter = 0;

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  console.log(res.body);
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post'
    });
  } else {
    const newPost = {
      id: idCounter++,
      title,
      contents
    };
    db.insert(post).then(post => {
      res.status(201).json({ newPost });
    });
  }
});

server.listen(port, () => console.log('API Running on port 5000'));
