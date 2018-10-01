// import your node modules
const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = require('./data/db.js');

// add your server code starting here

// quick text display to make sure everything loads properly

server.get('/', (req, res) => {
  console.log('test');
  res.send('Testing server.');
});

server.get('/posts', (req, res) => {
  db.find().then(posts => {
    console.log('\n** posts **', posts);
    res.json(posts);
  })
  .catch(err => res.send(err));
});

// listen on port 8000

server.listen(8000, () => console.log('Server listening on port 8000.'));
