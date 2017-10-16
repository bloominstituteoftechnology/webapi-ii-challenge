const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  const filteredPosts = posts.filter((post) => {
    return post.title.includes(term) || post.contents.includes(term);
  });
  if (term) {
    res.send(filteredPosts);
  } else {
    res.send(posts);
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide contents' });
    return;
  }
  const newPost = {
    id,
    title,
    contents
  };
  id++;
  posts.push(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const postId = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;

  if (!postId) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a post ID' });
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide contents' });
    return;
  }

  const newPost = posts.find(post => post.id === postId);

  if (!newPost) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'you must provide a valid post ID' });
    return;
  }

  newPost.title = title;
  newPost.contents = contents;
  res.json(newPost);
});

server.delete('/posts', (req, res) => {
  const postId = req.body.id;
  if (!postId) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a post ID' });
    return;
  }
  const validPost = posts.find((post) => {
    return post.id === postId;
  });
  if (!validPost) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a valid post ID' });
    return;
  }
  posts = posts.filter((post) => {
    return post.id !== postId;
  });
  res.json({ success: true });
});

module.exports = { posts, server };
