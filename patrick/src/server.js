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
  const term = req.query.term;
  // if no term, just send the posts array
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
    res.json({ error: 'Please try again.' });
  }
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
server.put('/posts', (req, res) => {
  res.send(posts);
});

// TODO: DELETE
server.delete('/posts', (req, res) => {
  res.send(posts);
});

module.exports = { posts, server };
