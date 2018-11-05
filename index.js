// import your node modules
const db = require('./data/db.js');

const express = require('express');
const server = express();
// add your server code starting here
console.log('hello');
server.listen(9000);

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: " error: 'The posts information could not be retrieved'" });
    });
});
