// import your node modules
const express = require('express');

const server = express();
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.send("Hello World!");
})

// Listener:
server.listen( PORT, () => {
  console.log( `Server started on port: ${PORT}`)
});