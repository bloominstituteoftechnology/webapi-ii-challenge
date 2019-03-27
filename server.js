const express = require('express');

const postRouter = require('./data/hubs/posts-router.js');

const server = express();

server.use(express.json())

server.use('/api/posts', postRouter)

//test
server.get('/', (req, res) => {
    res.send(`
    <h2> TEST WORKED </h2>
    `)
})

module.exports = server