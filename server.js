const express = require("express");
var cors = require("cors");
const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter);

module.exports = server;
