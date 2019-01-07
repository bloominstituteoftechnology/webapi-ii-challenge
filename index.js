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
    .catch(err =>
      res
        .status(500)
        .json({message: 'The posts information could not be retrieved'}),
    );
});

server.listen(5000);

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({error: 'The post with the specified ID does not exist'});
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({error: 'The post information could not be retrieved'}),
    );
});
