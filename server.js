const express = require('express');

const PostsRouter = require('./hubs/posts-router.js');


const server = express();

server.use(express.json());

server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => res.send('Api is up and running'));


module.exports = server;