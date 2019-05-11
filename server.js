const express = require("express");

const server = express();

const PostsRouter = require("./router/posts-router.js");

server.use(express.json());
server.search("/api/posts", PostsRouter);

module.exports = server;
