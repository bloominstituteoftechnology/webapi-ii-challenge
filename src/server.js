const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

let idCounter = 4;

let posts = [
  {
    title: 'b',
    contents: 'b',
    id: 1,
  },
  {
    title: 'ac',
    contents: 'b',
    id: 2,
  },
  {
    title: 'b',
    contents: 'cd',
    id: 3,
  },
  {
    title: 'e',
    contents: 'f',
    id: 4,
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const searchTerm = req.query.term;
  if (searchTerm === undefined) {
    res.send({ userPosts: posts });
  } else {
    let newArr = [];
    posts.forEach(obj => {
      if (obj.title.includes(searchTerm) || obj.contents.includes(searchTerm)) {
        newArr.push(obj);
      }
    });
    if (newArr.length === 0) {
      res.send({ userPosts: posts });
    } else {
      res.send({ userPosts: newArr });
    }
  }
});

server.post('/posts', (req, res) => {
  const newPost = req.body;
  if (!newPost.title) {
    res.status(405);
    res.send({ error: 'Missing title' });
    return;
  }
  if (!newPost.contents) {
    res.status(405);
    res.send({ error: 'Missing contents' });
    return;
  }
  newPost.id = ++idCounter;
  posts.push(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const newPost = req.body;
  if (!newPost.title) {
    res.status(405);
    res.send({ error: 'Missing title' });
    return;
  }
  if (!newPost.contents) {
    res.status(405);
    res.send({ error: 'Missing contents' });
    return;
  }
  if (!newPost.id) {
    res.status(405);
    res.send({ error: 'Missing ID' });
    return;
  }
  let idEqual = false;
  posts = posts.map(obj => {
    if (obj.id === Number(newPost.id)) {
      idEqual = true;
      return req.body;
    }
    return obj;
  });
  
  if (idEqual) {
  res.json(req.body);
  } else {
    res.send({ error: 'ID no match!' });
  }
});

module.exports = { posts, server };
