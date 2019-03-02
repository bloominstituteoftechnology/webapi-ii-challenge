const express = require('express');
const DataRouter = require('./data/data-routing.js');
const server = express();

server.use(express.json());
server.use('/api/posts', DataRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Lambda Posts</h1>`);
});

server.get('*', (req, res) => {
  res.status(404).send(`<h1>Page not found</h1>`);
});

module.exports = server;