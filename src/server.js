const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let idCounter = 0;
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term) {
    const strictRegex = new RegExp(req.query.term, 'i');
    const searched = posts.filter((item) => {
      if (item.title.match(strictRegex) || item.contents.match(strictRegex)) {
        return item;
      }
      return null;
    });
    res.status(STATUS_SUCCESS);
    res.send(searched);
  } else {
    res.status(STATUS_SUCCESS);
    res.send(posts);
  }
});

server.post('/posts', (req, res) => {
  if (req.body.title && req.body.contents) {
    const newPost = {};
    newPost.id = idCounter++;
    newPost.title = req.body.title;
    newPost.contents = req.body.contents;
    posts.push(newPost);
    res.status(STATUS_SUCCESS);
    res.send(newPost);
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'You did not include anything in either title and/or body' });
  }
});

server.put('/posts', (req, res) => {
  if (req.body.title && req.body.contents && (req.body.id || req.body.id === 0)) {
    let matched = false;
    posts.forEach((item, i) => {
      if (req.body.id === item.id) {
        matched = true;
        posts.splice(i, 1, req.body);
      }
    });
    if (!matched) {
      res.status(STATUS_USER_ERROR);
      res.send({ error: `The provided ID, ${req.body.id}, did not match any posts` });
    } else {
      res.status(STATUS_SUCCESS);

      res.send(req.body);
    }
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'You did not include anything in either title, content and/or id' });
  }
});

module.exports = { posts, server };
