/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (!term) {
    res.json(posts);
  } else {
    const termSearch = posts.filter((post) => {
      if (post.title.toLowerCase().includes(term) || post.contents.toLowerCase().includes(term)) return post;
    });
    res.send(termSearch);
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (!title || !contents || title.length === 0 || contents.length === 0) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide both title and contents' });
  } else {
    const newPost = {
      id,
      title,
      contents
    };
    posts.push(newPost);
    res.json(newPost);
    ++id;
  }
});

server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const postId = req.body.id;
  const idNum = Number(postId);
  const allIds = posts.map((post) => {
    return post.id;
  });

  if (!title || !contents || !postId || title === '' || contents === '' || postId === '') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide the id, title, and contents' });
  }
  else if (!allIds.includes(idNum)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'No such post id exist' });
  } else {
    const index = allIds.indexOf(idNum);
    const postToUpdate = {
      id: idNum,
      title,
      contents
    };
    posts.splice(index, 1, postToUpdate);
    res.json(postToUpdate);
  }
});

server.delete('/posts', (req, res) => {
  const postId = req.body.id;
  const idNum = Number(postId);
  const allIds = posts.map((post) => {
    return post.id;
  });

  if (!postId || postId === '') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post id' });
  }
  else if (!allIds.includes(idNum)) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'No such post id exist' });
  } else {
    const index = allIds.indexOf(idNum);
    posts.splice(index, 1);
    res.json({ success: true });
  }
});

module.exports = { posts, server };
