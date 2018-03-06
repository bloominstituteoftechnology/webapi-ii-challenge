const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
// const PORT = 3000;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'example one',
    contents: 'lorem ipsum'
  },
  {
    title: 'example two',
    contents: 'lorem ipsum'
  },
  {
    title: 'test',
    contents: 'lorem ipsum'
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


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
  res.status(STATUS_SUCCESS);
  res.send({
  });
});
// TODO: your code to handle requests

module.exports = { posts, server };
