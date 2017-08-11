const bodyParser = require('body-parser');
const express = require('express');

let id = 0;
const STATUS_USER_ERROR = 422;
const STATUS_NOT_FOUND = 404;
const STATUS_OK = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const filteredPosts = posts.filter((post) => {
      return (post.title.includes(term) || post.contents.includes(term));
    });
    res.json(filteredPosts);
  }
  if (!term) {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: 'Must provide a title'
    });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: 'Must provide contents'
    });
    return;
  }
  const newPost = {
    id,
    title,
    contents
  };
  posts.push(newPost);
  res.json(newPost);
  id++;
});

server.put('/posts', (req, res) => {
  const ID = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;
  if (!ID || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an ID, a title, and contents' });
    return;
  }
  posts.forEach((post) => {
    if (post.id === ID) {
      post.title = title;
      post.contents = contents;
      res.status(STATUS_OK);
      res.json({ title, contents, id: ID });
      return;
    }
  });
  res.status(STATUS_USER_ERROR).json({ error: 'Invalid ID was given' });
});

server.delete('/posts', (req, res) => {
  const ID = req.body.id;
  if (!ID) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide ID' });
    return;
  }
  posts.forEach((post) => {
    if (post.id === ID) {
      posts.splice(post, 1);
      res.status(STATUS_OK);
      res.json({ success: true });
      return;
    }
  });
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'Invalid ID was given' });
});
module.exports = {
  posts,
  server
};
