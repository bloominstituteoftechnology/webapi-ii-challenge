const express = require('express');
const helmet = require('helmet');

const postRouter = require("./data/postRouter")

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });
  
  server.use("/api/posts", postRouter)
  
  module.exports = server;