const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
  <h1>Server Side Routing</h1>
  <p>Posts and Comments</p>
  `);
});

module.exports = server;
