const express = require('express');

const server = express();

const Router = require('./router.js')

//middleware
server.use(express.json());

server.use('/api/posts', Router);

//request handlers
server.get('/', (req,res) => {
    res.send("I'm working!");
})


module.exports = server;