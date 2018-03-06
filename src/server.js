const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term) {
    let strictRegex = new RegExp(terms, 'i');

    const searched = posts.filter(item => {
      if (item.title.match(strictRegex) || item.contents.match(strictRegex)) {
        return item;
      }
    });
    res.status(STATUS_SUCCESS);
    res.send(searched);
  } else {
    res.status(STATUS_SUCCESS);
    res.send(posts);
  }
});

module.exports = { posts, server };
