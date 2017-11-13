const bodyParser = require('body-parser');
const express = require('express');
const uuidv1 = require('uuid/v1'); // was gonna try this out but the test required a number.

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = -1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    res.json(posts.filter(post => post.title.includes(term) || post.contents.includes(term)));
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  if (req.body.title && req.body.contents) {
    const post = { id: id += 1, title: req.body.title, contents: req.body.contents };
    posts.push(post);
    res.json(post);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'Must send both title and contents' });
  }
});

server.put('/posts', (req, res) => {
  const inPost = req.body;
  if (inPost.id && inPost.title && inPost.contents) {
    const postIndex = posts.findIndex(post => post.id === inPost.id);
    if (postIndex < 0) {
      res.status(STATUS_USER_ERROR).json({ error: `post with ${inPost.id} cannot be found.` });
    } else {
      posts[postIndex] = { ...posts[postIndex], title: inPost.title, contents: inPost.contents };
      res.json(posts[postIndex]);
    }
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'id, title and cotents must be present' });
  }
});

server.delete('/posts', (req, res) => {
  if (req.body.id) {
    const postIndex = posts.findIndex(post => req.body.id === post.id);
    if (postIndex < 0) {
      res.status(STATUS_USER_ERROR).json({ error: `post with id: ${req.body.id} cannot be found.` });
    } else {
      posts.splice(postIndex, 1);
      res.json({ success: true });
    }
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'must provide id' });
  }
});

module.exports = { posts, server };
