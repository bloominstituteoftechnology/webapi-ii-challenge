const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
    res.send(`<h1>Testing, 1 2 3!</h1>`)
})

module.exports = server;