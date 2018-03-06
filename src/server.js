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
    contents: 'This is the content body',
  },
  {
    id: 2,
    title: 'This is a Zebra of a post',
    contents: 'This is not the body',
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  let filteredPosts;
  const term = req.query.term.toLowerCase();

  if (term) {
    filteredPosts = posts.filter((post) => {
      return (
        (post.title.toLowerCase().indexOf(term) >= 0) ||
        (post.contents.toLowerCase().indexOf(term) >= 0)
      );
    });
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
