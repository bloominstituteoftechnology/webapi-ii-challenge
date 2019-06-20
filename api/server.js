const express = require('express');
const postsRouter = require('../hubs/posts-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h2>Posts API</h2>
    `)
});

server.use('/api/posts', postsRouter )

module.exports = server;