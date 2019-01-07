// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
  res.send('hello developer, welcome to my world');
});

server.get('/api/posts', (req, res) => {
  res.send('place holder for posts');
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  res.send(`place holder for dynamic ${id} posts`);
});

server.listen(8000, () => console.log('Server running, listening on port 8000'));