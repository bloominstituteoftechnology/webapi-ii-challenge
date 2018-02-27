const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH = '/posts';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  const thisPost = posts.find(p => p.id === Number(id));

  if (thisPost) {
    res.status(200).json(thisPost);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const id = req.body.id;

  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide title AND contents' });
    return;
  }
  posts.push({ id, title, contents });
  res.json({ posts });
});

server.put('/posts/:id', (req, res) => {
  const { post } = req.body;
  const id = Number(req.params.id);

  const index = posts.findIndex(p => p.id === id);
  posts.splice(index, 1, post);

  if (!post) {
    res.status(STATUS_NOT_FOUND);
    res.json({ error: 'post not found' });
    return;
  }
  res.status(200).send(posts);
});

module.exports = { posts, server };
