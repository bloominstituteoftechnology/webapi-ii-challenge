const express = require('express')
const cors = require('cors')
const app = require('./lotr-blog/src/index')

const BlogsRouter = require('./blogs/blogs-router')

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send(app)
})

server.use('/api/posts', BlogsRouter)

module.exports = server