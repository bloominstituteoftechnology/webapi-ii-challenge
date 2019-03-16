const express = require('express');


// const postRouter = require('./routes/post-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to the Lambda blog API</p>
  `);
});

// server.use('/api/posts',postRouter)


module.exports = server;