const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let counter = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const foundPosts = [];
    posts.forEach(post => {
      if (post.title.includes(term) || post.contents.includes(term))
        foundPosts.push(post);
    });
    return res.send(foundPosts);
  } else res.send(posts);
});

server.post('/posts', (req, res) => {
  if (!req.body.hasOwnProperty('title'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Post requires a key called 'title.'` });
  if (!req.body.hasOwnProperty('contents'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Post requires a key called 'contents.'` });
  if (!req.body.title || !req.body.contents)
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Both 'title' and 'contents' must have values.` });

  posts.push({ ...req.body, id: counter++ });
  res.send(posts[posts.length - 1]);
});

server.put('/posts', (req, res) => {
  if (!req.body.hasOwnProperty('title'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Put requires a key called 'title.'` });
  if (!req.body.hasOwnProperty('contents'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Put requires a key called 'contents.'` });
  if (!req.body.hasOwnProperty('id'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Put requires a key called 'id.'` });
  if (!req.body.title || !req.body.contents || !req.body.id)
    return res.status(STATUS_USER_ERROR).send({
      error: `'Title', 'contents', and 'id' must have truthy values.`,
    });
  let check = false;
  posts = posts.map(each => {
    if (each.id === req.body.id) {
      check = true;
      res.status(200).send(req.body);
      return req.body;
    }
    return each;
  });
  if (check === false)
    res.status(STATUS_USER_ERROR).send({ error: 'Post ID does not exist.' });
});

server.delete('/posts', (req, res) => {
  if (!req.body.hasOwnProperty('id'))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: `Put requires a key called 'id.'` });
  if (!req.body.id)
    return res.status(STATUS_USER_ERROR).send({
      error: `'Id' must have a truthy value.`,
    });

  let check = false;
  posts = posts.filter(post => {
    if (post.id === req.body.id) check = true;
    return post.id !== req.body.id;
  });
  if (!check)
    return res.status(STATUS_USER_ERROR).send({
      error: 'Post ID does not exist.',
    });
  return res.status(200).send({ success: true });
});

module.exports = { posts, server };
