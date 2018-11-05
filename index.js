// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

const db = require('./data/db.js');

server.listen(9000, () => {
  console.log('Server is up on 9000!');
});
