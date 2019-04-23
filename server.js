const express = require('express');
const postRouter = require('./data/posts/post-router.js');
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)

module.exports = server;