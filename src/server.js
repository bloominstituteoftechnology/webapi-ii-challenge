const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    { id: 0, title: 'First', content: 'Post1' },
    { id: 1, title: 'Second', content: 'Gouda\'s my favorite' }
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
      return (element.title.includes(term) || element.content.includes(term));
    }));
  }
  res.status(200).json(posts);
});

server.post('/api/posts', (req, res) => {
  if (typeof req.body.title === 'string' && typeof req.body.content === 'string') {
    const newPost = { id: [posts.length], title: req.body.title, content: req.body.content };
    posts.push(newPost);
    res.status(200).json(posts);
  } else {
    res.status(400).json({ error: 'needs title and content' });
  }
});

server.put('/api/posts', (req, res) => {
  if (typeof req.body.title === 'string' && typeof req.body.content === 'string' && typeof req.body.id === 'number') {
    const replacementPost = { id: req.body.id, title: req.body.title, content: req.body.content };
    // find if a post already has this id
    if (posts[req.body.id]) {
      posts[req.body.id] = replacementPost;
      res.send(posts);
    } else {
      res.status(400).json({ error: 'not a valid id' });
    }
  } else {
    res.status(400).json({ error: 'please include all needed data' });
  }
});
module.exports = { posts, server };
