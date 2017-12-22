const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const newPosts = [];
    posts.forEach((post) => {
      if (post.title.includes(term) || post.contents.includes(term)) newPosts.push(post);
    });
    res.json(newPosts);
  }
  res.json(posts);
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide title and contents!' });
    return;
  }
  const newPost = { id: posts.length + 1, title, contents };
  posts.push(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing information!' });
    return;
  }
  let found = false;
  posts.forEach((post) => {
    if (post.id === id) {
      post.contents = contents;
      post.title = title;
      found = true;
      res.json(post);
    }
  });
  if (!found) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'id not found!' });
    return;
  }
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'No id given!' });
    return;
  }
  let found = false;
  posts.forEach((post, i) => {
    if (post.id === id) {
      posts.splice(i, 1);
      found = true;
      res.json({ success: true });
    }
  });
  if (!found) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'id not found!' });
    return;
  }
});
module.exports = { posts, server };
