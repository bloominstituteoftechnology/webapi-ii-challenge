const express = require('express');

const postRouter = require('./data/postRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>good</h2>
    `);
  });

module.exports = server;