const express = require('express');

const PostsRouter = require('./data/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send('<h2> bout that blog life</h2>');
});

module.exports = server;
