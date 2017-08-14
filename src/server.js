const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;
const STRING = 'string';

let nextID = 0;

class Post {
  constructor(title, contents) {
    this.title = title;
    this.contents = contents;
    this.id = nextID++;
  }
  toString() {
    return `title: ${this.title}\tcontents: ${this.contents}`;
  }
}

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const query = req.query;
  const term = query.term;
  let resp = posts;

  if (term) {
    const re = new RegExp(term);
    resp = posts.filter(e => re.test(e.title) || re.test(e.contents));
  }

  res.status(STATUS_OK);
  res.json(resp);
  return;
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title' });
    return;
  }

  const contents = req.body.contents;
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide some contents' });
    return;
  }

  const newPost = new Post(title, contents);
  posts.push(newPost);

  res.status(STATUS_OK);
  res.json(newPost);
  return;
});

server.put('/posts', (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title' });
    return;
  }

  const contents = req.body.contents;
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide some contents' });
    return;
  }

  const id = req.body.id;
  if (id === null) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an id' });
    return;
  }

  const idPos = posts.findIndex(p => p.id === id);
  if (idPos === -1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `id: ${id} is not within posts` });
    return;
  }

  posts[idPos] = {
    title,
    contents,
    id
  };

  res.status(STATUS_OK);
  res.json(posts[idPos]);
  return;
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (id === null) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide in id' });
    return;
  }

  const idPos = posts.findIndex(p => p.id === id);
  if (idPos === -1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `${id} is not within posts` });
    return;
  }

  posts.splice(idPos, 1);
  res.status(STATUS_OK);
  res.json({ success: true });
  return;
});

module.exports = { posts, server };
