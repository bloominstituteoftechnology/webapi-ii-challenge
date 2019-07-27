const express = require('express');
const postsRouter = require('./data/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
  <h1>Server Side Routing</h1>
  <p>Posts and Comments</p>
  `);
});

module.exports = server;
