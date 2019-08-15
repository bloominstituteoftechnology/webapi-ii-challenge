const express = require('express')
const cors = require('cors')

const BlogsRouter = require('./blogs/blogs-router')

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send('<h2>Blog Posts</h2>')
})

server.use('/api/posts', BlogsRouter)

module.exports = server