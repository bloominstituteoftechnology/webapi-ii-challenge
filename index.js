// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/api/posts', (req, res) => {
  res.json('alive');
});

server.listen(9000, () => console.log('the server is alive!'));