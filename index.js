const express = require('express');
const postRouter = require('./posts/postRouter')
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)





const port = 8500
server.listen(port, () => console.log('server running'))