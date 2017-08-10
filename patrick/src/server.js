const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// req = request
// res = response
server.get('/posts', (req, res) => {
  // default to display entire posts array
  res.json({ posts });
});

server.post('/posts', (req, res) => {
  /* add a post to posts array
  {
    title: "The post title",
    contents: "The post contents"
  }
  */

});

server.put('/posts', (req, res) => {
  // return;
});

server.delete('/posts', (req, res) => {
  // return;
});

module.exports = { posts, server };
