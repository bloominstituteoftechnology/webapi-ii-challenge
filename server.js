// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const db = require('./data/db.js');

server.use(bodyParser.json());
// add your server code starting here
let posts = [];
let postId = 0;
server.post('/api/posts', (req, res) => {
  const { id, title, contents } = req.body;
  console.log(req.body);
  if (!title || !content) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    const newPost = { id: postId, title, content };
  }
  posts.push(newPost);
  postId++;
  res.status(201).json(posts);
});

server.get('/', (req, res) => {
  res.json({ Api: 'running' });
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    res.json(post);
  });
});

const port = 5000;
server.listen(port, () => console.log('api running on 5000'));
