const express = require('express')
const router = require('./router/post-router.js')
const server = express();

server.use(express.json())
server.use('/api/post', router)
server.listen(3333, () => console.log('server is running on http://localhost:3333/'));