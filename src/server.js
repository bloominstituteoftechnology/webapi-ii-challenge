const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
const error = `Error status: ${STATUS_USER_ERROR}`;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let lastId = 0;

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

server.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);

  if (id > posts.length) {
    res.status(STATUS_USER_ERROR).send({ error });
  } else {
    const postIndex = posts.findIndex(post => post.id === id);
    res.status(STATUS_OK).send(posts[postIndex]);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents, } = req.body;

  if (!title || !contents) {
    res.status(STATUS_USER_ERROR).send({ error });
  } else {
    const post = { title, contents, id: ++lastId, };
    posts.push(post);
    res.status(STATUS_OK).send(post);
  }
});

server.put('/posts', (req, res) => {
  const { id, title, contents, } = req.body;
  const index = posts.findIndex(post => post.id === id);

  if (!id || !title || !contents || index === -1) {
    res.status(STATUS_USER_ERROR).send({ error });
  } else {
    posts[index] = { id, title, contents, };
    res.status(STATUS_OK).send(posts[index]);
  }
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  const index = posts.findIndex(post => post.id === id);

  if (!id || index === -1) {
    res.status(STATUS_USER_ERROR).send({ error });
  } else {
    posts.splice(index, 1);
    res.status(STATUS_OK).send({ success: true });
  }
});

module.exports = { posts, server };
