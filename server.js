const express = require("express");

const cors = require("cors");

const PostRouter = require("./post/post-router.js");

const server = express();

server.use(express.json());

server.use(cors());

server.use("/api/posts", PostRouter);

server.listen(9000, () => console.log("\nRunning\n"));
