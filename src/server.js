const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_USER_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
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
  const { title, contents } = req.body;
  if (title === undefined || contents === undefined) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Error message' });
  } else {
    idCounter++;
    const newPost = {
      id: idCounter,
      ...req.body,
    };
    posts.push(newPost);
    res.status(STATUS_USER_SUCCESS);
    res.send(newPost);
  }
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  let foundPost = false;
  posts.forEach((post) => {
    if (post.id === id) foundPost = true;
  });
  if (
    id === undefined ||
    title === undefined ||
    contents === undefined ||
    !foundPost
  ) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'You must enter an existing id and title and contents' });
  } else {
    const newPost = {
      id,
      title,
      contents,
    };
    posts = posts.map((post) => {
      if (post.id === id) {
        return newPost;
      }
      return post;
    });
    res.status(STATUS_USER_SUCCESS);
    res.send(newPost);
  }
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  let foundPost = false;
  if (req.body.id) {
    posts.forEach((post) => {
      if (post.id === id) {
        foundPost = true;
      }
    });
  } 
  if (foundPost === true) {
    posts = posts.filter(post => {
     return post.id !== req.body.id;
    });
    res.status(STATUS_USER_SUCCESS);
    res.send({ success:true });
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Error message" });
  }
});

module.exports = { posts, server };
