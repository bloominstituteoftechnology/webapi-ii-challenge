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

let nextId = 0;

server.get('/posts', (req, res) => {
  const query = req.query.term;

  if (query === undefined) res.send(posts);
  else {
    res.send(
      posts.filter(
        post => post.title.includes(query) || post.contents.includes(query),
      ),
    );
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (title === undefined || contents === undefined) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'Title or contents undefined.' });
  } else {
    const newPost = { id: nextId++, title, contents };

    posts.push(newPost);
    res.send(newPost);
  }
});

server.put('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;

  if (id === undefined || title === undefined || contents === undefined) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'ID, title, or contents undefined.' });
  } else {
    const editPost = posts.find(post => post.id === id);

    if (editPost === undefined) {
      res
        .status(STATUS_USER_ERROR)
        .send({ error: `Post with ID -${id}- not found.` });
    } else {
      editPost.title = title;
      editPost.contents = contents;
      res.send(editPost);
    }
  }
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;

  const postsLength = posts.length;

  posts = posts.filter(post => post.id !== id);

  if (posts.length === postsLength) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: `Post with ID -${id}- not found.` });
  } else res.send({ success: true });
});

module.exports = { posts, server };
