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
  const term = req.query;
  const results = posts.filter(post => post.title === term || post.contents === term);
  if (results.length !== 0) {
    return res.status(200).json(results);
  }
  res.status(200).json(posts);
});

server.post('/posts', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error message' });
    return;
  }

  post.id = posts.length;
  posts.push(post);
  res.status(201).json(posts);
});

server.put('/posts', (req, res) => {
  const post = req.body;
  if (!post.id || !post.title || !post.contents || !posts[post.id]) {
  	res.status(STATUS_USER_ERROR);
  	res.json({ error: 'Error message'});
  	return;
  }
  posts[post.id].title = post.title;
  posts[post.id].contents = post.contents;
  res.status(201).json(posts);
});

server.delete('/posts', (req, res) => {
  const post = req.body;
  if (!post.id || !posts[post.id]) {
  	res.status(STATUS_USER_ERROR);
  	res.json({ error: 'Error message'});
  	return;
  }
  posts.splice(post.id, 1);
  res.status(200).json( { success: true });
});

module.exports = { posts, server };
