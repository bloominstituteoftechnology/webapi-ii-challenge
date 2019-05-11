const express = require('express');

const PostsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);




module.exports = server;
