// library
const express = require('express');

// others
const postRouter = require('./post-router.js')

// global
const server = express();

// middleware
server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>')
})

module.exports = server;
