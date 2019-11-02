const express = require("express");

const postsRouter = require("./postsRouter");

const server = express();

server.use(express.json());
server.use("/api/posts/", postsRouter);

server.get("/", (req, res) => {
  res.send(`
  <h2>Lambda Hubs API</h>
  <p>Welcome to the Lambda Hubs API</p>
`);
});

module.exports = server;
