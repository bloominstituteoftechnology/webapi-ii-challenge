const express = require('express');

const postRouter = require('./data/router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
  <h1>Posts Api</h1>
  `);
});

server.use('/api/posts', postRouter);

module.exports = server;