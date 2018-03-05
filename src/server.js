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


server.get('/posts/', (req, res) => {
  const { term } = req.query;
  if (!term) {
    res.json(posts);
  }
  const filteredPost = posts.filter((post) => {
    if (post.title.includes(term) || post.contents.includes(term)) {
      return true;
    }
    return false;
  });
  if (filteredPost.length < 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'No such post' });
  }
  res.json(filteredPost);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  const id = Math.floor(Math.random() * 10000);
  const newPost = { title, contents, id };
  if (!contents || !title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide title or content for search' });
  }
  posts.push(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide post ID, post title or post content' });
  }
  let result;
  let flag = false;
  posts.forEach((post) => {
    if (post.id === id) {
      result = post;
      result.contents = contents;
      result.title = title;
      flag = true;
    }
  });
  if (flag === false) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'ID does not exist' });
  }
  res.json(result);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an ID' });
  }
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
      res.json({ success: true });
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'Invalid ID' });
});

module.exports = { posts, server };
