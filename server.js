const express = require('express');
const postRouter = require('./data/posts/post-router')
const server = express();

server.use(express.json());
server.use('./data/posts', postRouter)

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda </h>
      <p>Welcome API</p>
    `);
  });

  server.use('./data/posts', postRouter);

  module.exports = server;