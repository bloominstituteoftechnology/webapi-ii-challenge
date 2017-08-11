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

server.get('/posts', (req, res) => {
  res.json({ posts });
});

server.post('/posts', (req, res) => {
const title = req.body.title;
const contents = req.body.contents;
let post = {
  title: title,
  contents: contents,
  id: posts.length + 1
}


if (!title) {
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'You Must Provide a Title' });
  return;
}
if (!contents) {
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'You Must Provide Content' });
  return;
}
// console.log(post.title);
posts.push(post);
res.send({ post });

});

server.put('/posts', (req, res) => {

});

server.delete('/posts', (req, res) => {

});

module.exports = { posts, server };
