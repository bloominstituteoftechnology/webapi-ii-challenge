// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

const port = 4000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      console.log('post ', post);
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      console.log('err ', err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
