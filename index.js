// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here
server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

const db = require('./data/db.js');

server.listen(9000, () => {
  console.log('Server is up on 9000!');
});
