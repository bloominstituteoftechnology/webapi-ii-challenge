// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
  res.send('Api running');
});

server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

server.get('/api/posts/:id', (req, res) => {
  db
  .findById(req.params.id)
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

server.delete('/api/posts/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
})

server.listen(5000, console.log('\n== API Running on port 500 ==\n'));