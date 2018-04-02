// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

const server = express();

server.use(bodyParser.json());
// add your server code starting here

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    const newPost = {
      title: title,
      contents: contents
    };
    db.insert(newPost);
    res.status(201).json({ newPost });
  }
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
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
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      message: 'The post with the specified ID does not exist.'
    });
  }
  db.remove(id).catch(error => {
    res.status(500).json({ error: 'The post could not be removed' });
  });
});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
