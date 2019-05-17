const express = require('express')
const helmet = require('helmet')

const server = express()

const postRoutes = require('../posts/postRoutes')

server.use(helmet())
server.use(express.json())
server.use('/api/posts', postRoutes)

server.get('/', (req, res) => {
    res.status(200).json({messgae: 'this better work'})
})

module.exports = server