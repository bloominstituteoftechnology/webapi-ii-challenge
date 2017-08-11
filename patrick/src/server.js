const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// const posts = [];
const posts = []; // Karthik's hint re: using let posts = [] ???????
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: FILTERS
server.get('/posts', (req, res) => {
  res.json(posts);
});

// TODO: PASS "Request POST /posts adds a post:" TEST
server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a TITLE to your post.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add CONTENTS to your post.' });
    return;
  }
  const newPost = { id, title, contents };
  posts.push(newPost);
  res.json(newPost);
  id++;
});

// TODO: PUT

// TODO: DELETE

module.exports = { posts, server };
