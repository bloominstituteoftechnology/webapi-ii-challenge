// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`server running on port: ${8080}`);
});
