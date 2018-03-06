const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
// const PORT = 3000;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

let idCounter = 0;


server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.status(STATUS_SUCCESS);
    res.send({ filtered });
  } else {
    res.status(STATUS_SUCCESS);
    res.send({
      posts,
    });
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Post must include a title and contents.' });
  } else {
    const newPost = {
      id: idCounter++,
      title,
      contents,
    };
    posts.push(newPost);
    res.status(STATUS_SUCCESS);
    res.json(newPost);
  }
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const findPostByID = (post) => {
    return post.id === +id;
  };
  const foundPost = posts.find(findPostByID);

  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Post needs an id, title, and contents' });
  } else if (!foundPost) {
    res.status(STATUS_USER_ERROR);
    res.json('No post found by that ID');
  } else {
    if (title) foundPost.title = title;
    if (contents) foundPost.age = contents;
    res.json(foundPost);
  }
});

server.delete('/posts/:id', (req, res) => {
  const check = posts.length;
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: 'user did not include an id',
    });
  } else {
    posts = posts.filter(post => post.id !== +id);
    if (posts.length === check) {
      res.status(STATUS_USER_ERROR);
      res.json({
        error: 'user entered id that does not exist',
      });
    } else {
      res.status(STATUS_SUCCESS);
      res.json({
        success: true,
        data: posts,
      });
    }
  }
});

module.exports = { posts, server };
