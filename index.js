// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');
const server = express();

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'find failed', error: err});
    });
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'findById failed', error: err});
    });
});






server.listen(9000, () => console.log('Listening on 9000'));
