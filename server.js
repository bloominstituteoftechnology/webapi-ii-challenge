const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);


server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


module.exports = server;