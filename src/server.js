const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let idGen = 3;
const posts = [
  {
    title: 'A One',
    contents: 'The post contents',
    id: 0
  },
  {
    title: 'A Two',
    contents: 'The post contents',
    id: 1
  },
  {
    title: 'A Three',
    contents: 'The target contents',
    id: 2
  }
];

const server = express();
// server.use((req, res, next) => {
//   console.log('You got a Request');
//   next();
// });

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const { term } = req.query;
  const results = [];

  if (!term || term === '' || term === undefined) {
    res.status(STATUS_SUCCESS);
    res.send(posts);
  }

  posts.forEach((post) => {
    const tempTitle = post.title.toLowerCase();
    const tempContents = post.contents.toLowerCase();
    const tempTerm = term.toLowerCase();
    const l = tempTerm.length;

    for (let i = 0; i <= tempTitle.length - l; i++) {
      if (tempTitle.substring(i, i + l) === tempTerm) results.push(post);
    }
    for (let i = 0; i <= tempContents.length - l; i++) {
      if (
        tempContents.substring(i, i + l) === tempTerm &&
        !results.includes(post)
      ) {
        results.push(post);
      }
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
    body.title === '' ||
    body.contents === ''
  ) {
    res.status(STATUS_USER_ERROR);
    res.send({
      error:
        'Object Requires Title and Contents. Also no empty strings naughty user...'
    });
  }
  const { title, contents } = body;
  title.toString();
  contents.toString();
  posts.push({ title, contents, id: idGen.toString() });
  ++idGen;
  res.status(STATUS_SUCCESS);
  res.send({ posts });
});

server.put('/posts', (req, res) => {
  const { body } = req;
  if (
    !body.hasOwnProperty('title') ||
    !body.hasOwnProperty('contents') ||
    !body.hasOwnProperty('id') ||
    body.title === '' ||
    body.contents === '' ||
    body.id === ''
  ) {
    res.status(STATUS_USER_ERROR);
    res.send({
      error:
        'Object Requires Title and Contents and Id. Also no empty strings naughty user...'
    });
  }
  const { title, contents, id } = body;
  if (posts[id] === undefined || posts[id] === null) {
    res.status(STATUS_USER_ERROR);
    res.send({ Error: `No valid entry for id ${id}` });
  }
  if (id <= posts.length - 1 && id >= 0) {
    posts[id] = { title, contents, id };
  }
  res.status(STATUS_SUCCESS);
  res.send({ updatedPost: { title, contents, id } });
});

server.delete('/posts', (req, res) => {
  const { body } = req;
  if (!body.hasOwnProperty('id')) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Delete requires a target id' });
  }

  const { id } = body;
  if (posts.length > id > -1 && posts[id] !== null && posts[id] !== undefined) {
    delete posts[id];
    res.status(STATUS_SUCCESS);
    res.send({ Success: true });
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({
      error: `Entry with ID '${id}' does not exist... Pick again padawan`
    });
  }
});
// TODO: your code to handle requests
/* eslint no-prototype-builtins: 0 */

module.exports = { posts, server };
