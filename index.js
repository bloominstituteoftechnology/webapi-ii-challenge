// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
//
server = express();

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(404).json(err));
});

server.listen(5000);
