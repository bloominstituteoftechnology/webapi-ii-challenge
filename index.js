const express = require('express');

const postRouter = require("./blogPosts/postRouter");

const server = express();

const port = 8000;

server.use(express.json());

server.use("/api/posts", postRouter);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})