const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  // res.send('RESPONSE from server: HTTP GET /posts');
  res.json(posts); // <--- THIS ALONE PASSES FIRST TEST
});

server.post('/posts', (req, res) => {
  // res.send('RESPONSE from server: HTTP POST /posts');
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
  const aPost = { id, title, contents };
  posts.push(aPost);
  res.json(posts);
  id++;
});

module.exports = { posts, server };
