const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let idCounter = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.post('/post', (req, res) => {
  const singlePost = req.body.singlePost;
  if (!singlePost.title || !singlePost.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Please provide a title and contents...'});
    return;
  }
  singlePost.ID = idCounter;
  posts.push(singlePost);
  idCounter += 1;
  res.json(singlePost);
});

console.log('server listening on port 3000');

module.exports = { posts, server };
