// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
  res.send('hello developer, welcome to my world');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({error: "The Posts information could not be retrieved."}))
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(404).json({message: "The post with the specified ID does not exist."}))
  // res.send(`place holder for dynamic ${id} posts`);
});

server.post('/api/posts', (req, res) => {
  res.send('place holder');
});

server.delete('/api/posts/:id', (req, res) => {
  res.send('place holder');
});

server.put('/api/posts/:id', (req, res) => {
  res.send('place holder');
});

server.listen(8000, () => console.log('Server running, listening on port 8000'));