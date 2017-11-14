const express = require('express');
const bodyParser = require('body-parser');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).send('<h2>Home Page</h2>');
});

server.get('/posts', function(req, res) {
  const term = req.query.term;
  let results = '';

  if (term) {
    results = posts.filter(phrase => phrase.title.includes(term) || phrase.contents.includes(term));
  } else {
    results = posts;
  }
  res.status(200).json(results);
});

server.post('/posts', function(req, res) {
  const post = req.body;

  if (post.title && post.contents) {
    posts.push(post);
    res.status(200).json(posts);
  } else {
    res.status(422).json(`User error`);
  }
});

server.put('/posts', function(req, res) {
  const update = req.body;

  if (update.id && update.title && update.body) {
    //update post
  } else {
    res.status(422).json(`User did not supply all fields: id, title, body`);
  }
});

module.exports = { posts, server };
