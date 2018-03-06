const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_USER_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
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

let idCounter = posts.length;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  let filteredPosts;

  if (req.query.term) {
    const term = req.query.term.toLowerCase();
    filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().indexOf(term) >= 0 ||
        post.contents.toLowerCase().indexOf(term) >= 0
      );
    });
    if (filteredPosts.length > 0) {
      res.status(STATUS_USER_SUCCESS);
      res.send(filteredPosts);
    } else {
      res.status(STATUS_USER_ERROR);
      res.send(posts);
    }
  } else {
    res.status(STATUS_USER_ERROR);
    res.send(posts);
  }
});

server.post('/posts', (req, res) => {
  if(req.body.title === undefined || req.body.contents === undefined) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Error message" });
  } else {
    idCounter++;
    const newPost = {
      id: idCounter,
      ...req.body
    }
    posts.push(newPost);
    res.status(STATUS_USER_SUCCESS);
    res.send(newPost);
  }  
});

server.put('/posts', (req, res) => {});

server.delete('/posts', (req, res) => {});

module.exports = { posts, server };
