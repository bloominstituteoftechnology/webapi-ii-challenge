const express = require('express');
const postRouter = require('./postRouter.js');

const server = express();
server.use(express.json());
server.use('/api/posts', postRouter)

server.listen(4000, () => console.log('server 4000'))