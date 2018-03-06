const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let idGen = 3;
const posts = [
  {
    title: 'X One',
    contents: 'The post contents',
    id: 0
  },
  {
    title: 'X Two',
    contents: 'The post contents',
    id: 1
  },
  {
    title: 'X Three',
    contents: 'The target contents',
    id: 2
  }
];

const server = express();
server.use((req, res, next) => {
  console.log('You got a Request');
  next();
});

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const { term } = req.query;
  const results = [];

  if (!term) {
    res.status(STATUS_SUCCESS);
    res.send({ posts });
  }

  posts.forEach((post) => {
    const tempTitle = post.title.toLowerCase();
    const tempContents = post.contents.toLowerCase();
    term.toLowerCase();
    const l = term.length;
    for (let i = 0; i <= tempTitle.length - l; i++) {
      if (tempTitle.substring(i, i + l) === term) results.push(post);
    }
    for (let i = 0; i <= tempContents.length - l; i++) {
      if (tempContents.substring(i, i + l) === term) results.push(post);
    }
  });
  if (results.length === 0) {
    res.status(STATUS_SUCCESS);
    res.send({ posts });
  } else {
    res.status(STATUS_SUCCESS);
    res.send({ results });
  }
});

server.post('/posts', (req, res) => {
  const { body } = req;
  if (
    !body.hasOwnProperty('title') ||
    !body.hasOwnProperty('contents') ||
    body['title'] === '' ||
    body['contents'] === ''
  ) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Error Message' });
  }
  const { title, contents } = body;
  title.toString();
  contents.toString();
  posts.push({ title, contents, id: idGen });
  ++idGen;
  res.status(STATUS_SUCCESS);
  res.send({ posts });
});

// TODO: your code to handle requests

module.exports = { posts, server };
