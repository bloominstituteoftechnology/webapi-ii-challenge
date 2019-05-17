const express = require('express');

const PostsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use('https://sprint-app.herokuapp.com/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's figure this out together</h2>`)
});




module.exports = server;
