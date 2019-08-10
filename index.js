const express = require('express')
const postRouter = require('./router/post-router.js')
const server = express()

server.use(express.json())
server.use('/api/post', postRouter)
server.listen(3333, () => console.log('server is running'))
