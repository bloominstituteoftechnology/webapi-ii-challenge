const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;


const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (!term) {
    res.json(posts);
  } else if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
    });
    if (filtered.length > 0) {
      res.json(filtered);
      return;
    }
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Search term not found' });
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Make sure you have entered a title and contents' });
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
  const title = req.body.title;
  const contents = req.body.contents;
  const postId = req.body.id;

  if (!title || !contents || !postId) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide a title, contents, and id' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (postId === posts[i].id) {
      posts[i] = req.body;
      res.status(STATUS_OK);
      res.json(req.body);
      return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: `ID ${postId} is not in the array` });
  return;
});

server.delete('/posts', (req, res) => {
  const postId = req.body.id;
  if (!postId) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Enter a valid ID' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (postId === posts[i].id) {
      posts.splice(i, 1);
      res.status(STATUS_OK).json({ success: true });
      return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: `${postId} is not a valid ID` });
  return;
});
module.exports = { posts, server };
