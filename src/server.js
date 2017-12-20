const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_CREATED = 200;

let posts = [];

let nextID = 1;

const server = express();
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 ||
        post.contents.indexOf(term) !== -1;
    });
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;

  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post contents' });
    return;
  }

  const post = { id: nextID, title, contents };
  nextID += 1;

  posts.push(post);


  res.status(STATUS_CREATED).json(post);
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;

  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post id' });
    return;
  }

  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide post contents' });
    return;
  }

  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Couldn't find a post with id ${id}` });
    return;
  }

  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post id' });
    return;
  }

  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Couldn't find a post with id ${id}` });
    return;
  }

  posts = posts.filter(p => p.id !== id);
  res.json({ success: true });
});

module.exports = { posts, server };
