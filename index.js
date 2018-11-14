// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(7777, () => console.log('server is operational'));