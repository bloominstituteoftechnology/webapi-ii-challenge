const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let ID = 1;

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    res.json(posts.filter((post) => {
      return ((post.title.indexOf(term) >= 0) || (post.contents.indexOf(term) >= 0));
    }));
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must include a title.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide provide contents.' });
    return;
  }

  const id = ID;
  const post = { id, title, contents };
  posts.push(post);
  ID++;
  res.json(post);
});

server.put('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;

  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide an id.' });
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide a title.' });
    return;
  }
  if (!(contents)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide contents' });
    return;
  }

  const post = posts.find(eachPost => eachPost.id === id);

  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'There is no post that matches the criteria.' });
    return;
  }

  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;

  const postFound = posts.find((post) => {
    return post.id === id;
  });

  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide an id.' });
    return;
  }

  if (!postFound) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'There is no post with that id.' });
    return;
  }

  posts = posts.filter((ind) => {
    return ind.id !== id;
  });

  res.json({ success: true });
});

module.exports = { posts, server };
