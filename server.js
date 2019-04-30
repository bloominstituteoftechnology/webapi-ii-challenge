const express = require('express');
const server = express();
const postsRouter = require('./posts/posts-router');

server.use('/api/posts', postsRouter);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
  <h2>Lambda Posts</h2>
  <p>Welcome to Lambda Posts App</p>
  `);
});

module.exports = server;