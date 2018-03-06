const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

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
    const newPosts = posts.filter((post) => {
      return posts.title.includes(term) || posts.contents.includes(term);
    });
    res.json(newPosts);
  } else {
    res.json(posts);
  }
});

// server.post('/posts:', (req, res) => {
//   const title = req.body.title;
//
//   if (title.length >= 1 && contents.length >= 1) {
//     res.json(posts);
//   } else {
//     res.status(STATUS_USER_ERROR);
//     res.json('You must submit both the title and the content')
//   }
// });


module.exports = { posts, server };
