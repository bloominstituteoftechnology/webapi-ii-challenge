const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    { title: 'First', post: 'Post1' },
    { title: 'Second', post: 'Gouda\'s my favorite' }
];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
// works
server.get('/api/posts', (req, res) => {
  if (req.query.term) {
    const term = req.query.term;
    res.status(200).json(posts.filter((element) => {
      return (element.title.includes(term) || element.post.includes(term));
    }));
  }
  res.status(200).json(posts);
});

server.post('/api/posts', (req, res) => {
  if (typeof req.body.title === 'string' && typeof req.body.post === 'string') {
    const newPost = { title: req.body.title, post: req.body.post };
    posts.push(newPost);
    res.status(200).json(posts);
  } else {
    res.status(400).json({ error: 'needs title and content' });
  }
});

server.put('/api/posts', (req, res) => {
  posts[req.body.index] = req.body.post;
  res.send(posts);
});
module.exports = { posts, server };
