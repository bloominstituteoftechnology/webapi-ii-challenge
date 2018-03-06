const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
  {
    id: 0,
    title: 'Title 1',
    contents: 'dogs run',
  },
  {
    id: 1,
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
  if (!term) {
    res.status(200);
    res.send(posts);
  }
  posts.forEach((element) => {
    if (element.title.includes(term) || element.contents.includes(term)) {
      searchResults.push(element);
    }
  });
  if (searchResults.length === 0) {
    res.send({ error: 'No Match!' });
  }
  res.send(searchResults);
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
  posts.forEach((element) => {
    if (element.id !== id) {
      res.send({ error: 'Error message' });
    } else if (element.id === id) {
      element.title = title;
      element.contents = contents;
      res.send(element);
    }
  });
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.send({ error: 'Error message' });
  }
  posts = posts.filter(post => post.id !== id);
  res.send({ success: true });
  // posts.forEach((element) => {
  //   if (element.id !== id) {
  //     res.send({ error: 'Error message' });
  //   } else {
  //   }
  // });
});

module.exports = { posts, server };
