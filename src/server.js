const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const { term } = req.query;
  const retValue = !term
    ? posts
    : posts.filter((post) => {
      return post.title.includes(term)
        || post.contents.includes(term);
    });
  res.status(STATUS_OK).send(retValue);
});

server.post('/posts', (req, res) => {
  const { title, contents, } = req.body;
  let post;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR).send({ error: 'Error Message' });
  } else {
    post = { title, contents, id: posts.length + 1, };
    posts.push(post);
  }
  res.status(STATUS_OK).send(post);
});

server.put('/posts', (req, res) => {
  const { id, title, contents, } = req.body;
  if (!id || !title || !contents || id > posts.length) {
    res.status(STATUS_USER_ERROR).send({ error: 'Error Message' });
  } else {
    posts[id - 1] = { id, title, contents, };
    res.status(STATUS_OK).send(posts[id - 1]);
  }
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id || id > posts.length) {
    res.status(STATUS_USER_ERROR).send({ error: 'Error Message' });
  } else {
    posts.splice(id - 1, 1);
    res.status(STATUS_OK).send({ success: true });
  }
});

module.exports = { posts, server };
