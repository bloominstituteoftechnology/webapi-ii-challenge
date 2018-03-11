const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 1;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term) {
    res.json(posts.filter((post) => {
      return post.title.includes(req.query.term) || post.contents.includes(req.query.term);
    }));
  }
  res.json(posts);
});
server.post('/posts', (req, res) => {
  if (req.body.title && req.body.contents) {
    req.body.id = id;
    id++;
    posts.push(req.body);
    res.json(req.body);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'Requires A `title` and `contents`' });
  }
});

server.put('/posts', (req, res) => {
  let found = false;
  posts.map((post) => {
    if (post.id === req.body.id) {
      found = true;
      post.title = req.body.title;
      post.contents = req.body.contents;
    }
    return post;
  });
  return found && req.body.title && req.body.contents ? res.json(req.body) : res.status(STATUS_USER_ERROR).json({ error: 'NO ID FOUND' });
});

server.delete('/posts', (req, res) => {
  if (req.body.id) {
    let found = false;
    const updated = posts.map((post, i) => {
      if (post.id === req.body.id) {
        posts.splice(i, 1);
        found = true;
      }
      return post;
    });
    found = found ? res.json({ success: true }) : res.status(STATUS_USER_ERROR).json({ error: 'ID NOT FOUND' });
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'Requires an Id' });
  }
});

module.exports = { posts, server };
