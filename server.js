const postRoutes = require('./posts/postRoutes')
const express = require('express')
const server = express()
const port = 8008

server.use(express.json())
server.use('/api/posts', postRoutes)
server.listen(port, () => console.log(`hearing voices on port ${port}`))