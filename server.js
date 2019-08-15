const express = require('express') //importing in express

const PostsRouter = require('./posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to the server!<h1>`)
})

module.exports = server;