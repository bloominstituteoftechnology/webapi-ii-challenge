// import your node modules
const express = require('express');
const db = require('./data/db.js');
const posts =require('./data/seeds/posts.js');
const bodyParser = require('body-parser');
const server = express();

// add your server code starting here

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});


server.get('/api/posts', (req, res) => {
  db
    .find().then(posts => {
      res.json(posts);
  })
    .catch(error => {
      res.status(500).json(error);
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id).then(posts => {
      res.json(posts[0]);
  })
    .catch(error => {
      res.status(500).json(error);
  });
});

server.post('/api/posts', (req, res) => {
  if (req.title && req.contents) {
    const newPost = {};
    newPost.id = idCounter++;
    newPost.title = req.title;
    newPost.contents = req.contents;
    posts.push(newPost);
    res.status(201);
    res.json(newPost);
  } else {
    res.status(400);
    res.json({ errorMessage: 'Please provide title and contents for the post.' });
  }
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
