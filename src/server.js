const bodyParser = require('body-parser');
const express = require('express');
const Posts = require('./Posts');

const STATUS_USER_ERROR = 422;

const generateId = ((function generateId() {
  let id = 0;
  return () => ++id;
})());

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = new Posts([]);

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  res.status(200).json(posts.getPosts());
});

server.post('/posts', (req, res) => {
  const id = generateId();
  const post = { id, ...req.body };
  if (Posts.isValidPost(post)) {
    posts.addPost(post);
    res.status(200).json(post);
  } else {
    res.status(422).json({ error: 'Error message' });
  }
});

server.put('/posts', (req, res) => {
  const post = { ...req.body };
  if (Posts.isValidPost(post) && posts.containsPost(post)) {
    posts.updatePost(post);
    res.status(200).json(post);
  } else {
    res.status(422).json({ error: 'Error message' });
  }
});

server.delete('/posts', (req, res) => {
  if ('id' in req.body) {
    const id = req.body.id;
    const removedPost = posts.removePostById(id);
    if (removedPost) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Error message' });
    }
  } else {
    res.status(404).json({ error: 'Error message' });
  }
});

module.exports = { posts: posts.getPosts(), server };
