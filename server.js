const express = require("express");
const cors = require("cors");

const server = express();

const PostsRouter = require("./router/posts-router.js");

server.use(express.json());
server.use(cors());
server.use("/api/posts", PostsRouter);

module.exports = server;

