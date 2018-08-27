const express = require('express');
const server = express();
// import your node modules

const db = require('./data/db.js');

// add your server code starting here

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    })
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
    })
});

server.listen(8000, () => {
  console.log('Listening on port 8000...');
})
