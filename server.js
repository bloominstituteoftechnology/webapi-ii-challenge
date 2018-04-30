// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    res.send('API running');
});

server.get('/api/posts', (req, res) => {
//get the posts
 db
  .find()
 .then(posts => {
   res.json(posts);
 })
 .catch(err => {
   res.status(500).json({ error: err });
// do something with the error
 });
});
