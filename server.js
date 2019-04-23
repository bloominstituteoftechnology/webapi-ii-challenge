
const express = require('express');
const server = express();
const postRouter = require('./post-router')


server.use(express.json())
server.use('/api/posts', postRouter)

server.get("/", (req, res) =>{
    res.send( "hello")
})





module.exports = server;