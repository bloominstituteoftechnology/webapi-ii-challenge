const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_USER_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let idCounter = 3;
const posts = [
  {
    id: 1,
    title: 'This is a Title of a post',
    content: 'This is the content body',
  },
  {
    id: 2,
    title: 'This is a Zebra of a post',
    content: 'This is not the body',
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  let filteredPosts;
  if (req.query.term) {
    filteredPosts = posts.filter(
      post =>
        post.title.toLowerCase().indexOf(req.query.term.toLowerCase()) > 0 ||
        post.contents.toLowerCase().indexOf(req.query.term.toLowerCase()) > 0
    );
    res.status(STATUS_USER_SUCCESS);
    res.send(filteredPosts);
  }
  //   if (filteredPosts.length > 0) {

  //   } else {
  //     res.status(STATUS_USER_ERROR);
  //     res.send(posts);
  //   }
  // } else {
  //   res.status(STATUS_USER_ERROR);
  //   res.send('Please enter a search term.');
  // }
});

server.post('/posts', (req, res) => {});

server.put('/posts', (req, res) => {});

server.delete('/posts', (req, res) => {});

module.exports = { posts, server };
