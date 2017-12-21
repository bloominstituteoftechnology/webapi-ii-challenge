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
    res.status(200).json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'needs title and content' });
  }
});

server.put('/api/posts', (req, res) => {
    // shorthand from lecture
  const { id, title, content } = req.body;
  if (title && content && id) {
    const replacementPost = { id, title, content };
    // find if a post already has this id
    let post = posts.find(p => p[id] === Number(id));
    if (post) {
      post = replacementPost;
      res.status(200).send(post);
    } else {
      res.status(STATUS_USER_ERROR).json({ error: 'not a valid post' });
    }
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'please include all needed data' });
  }
});

server.delete('/api/posts', (req, res) => {
  const index = req.body.id;
  const postIndex = posts.findIndex(p => p.index === Number(index));
  if (postIndex >= 0) {
    posts.splice(postIndex, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'not found' });
  }
});
module.exports = { posts, server };
