const express = require('express');

const userRouter = require('./db.router.js');
const server = express();

server.use(express.json());
server.use('/api/posts', userRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda User API's</p>
  `);
})

module.exports = server;