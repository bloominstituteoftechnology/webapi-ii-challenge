const express = require("express");

const postsRouter = require("./data/posts-router");

const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);

module.exports = server;
