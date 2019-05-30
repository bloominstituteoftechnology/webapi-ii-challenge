const express = require('express');

const postRouter = require('../posts/post-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda </h>
    <p>Welcome API</p>
  `);
});

server.use('/api/posts', postRouter);

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

// export default server // ES2015 modules
module.exports = server; // <<<<<<<<<<<<<<<<< add this line
