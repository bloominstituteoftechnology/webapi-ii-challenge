const commentRouter = require('./routes/comment-router.js');
const postRouter = require('./routes/post-router.js');
const express = require('express');
const server = express();


server.use(express.json());
server.use('/api/posts', postRouter)

server.listen(8000, () => console.log('\nServer is running...\n'))