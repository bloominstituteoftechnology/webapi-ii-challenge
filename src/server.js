const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    id: 10,
    title: 'Title 1',
    contents: 'dogs run',
  },
  {
    id: 11,
    title: 'Title 2',
    contents: 'cats meow',
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  const searchResults = [];
  if (term) {
    posts.forEach(element => {
      if (element.title.includes(term) || element.content.includes(term)) {
        searchResults.push(element);
      } else {
        res.send({ error: 'No match!' });
      }
    });
    res.send(searchResults);
  }
  res.status(200);
  res.send(posts);
});

let idCounter = 1;

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const newObj = { title: '', contents: '', id: idCounter };
  if (!title || !contents) {
    res.send({ error: 'Error message' });
  } else {
    newObj.title = title;
    newObj.contents = contents;
    newObj.id = idCounter++;
    posts.push(newObj);
    res.json(posts);
  }
});

server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const id = req.body.id;
  if (!title || !contents || !id) {
    res.send({ error: 'Error message' });
    res.status(422);
  }
  posts.forEach(element => {
    if (element.id !== id) {
      res.send({ error: 'Error message' });
    }
  });
});

module.exports = { posts, server };
