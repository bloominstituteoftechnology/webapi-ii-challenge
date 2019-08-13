const express = require('express');
const postsRouter = require('./data/posts/posts-router');
const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Blog API</h>
		<p>Welcome to the Blog Api</p>
  `);
});

module.exports = server;
