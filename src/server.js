const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_NOT_FOUND = 404;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'Antonio',
    content: 'null'
  },
  {
    title: 'Stevie',
    content: 'true'
  },
  {
    title: 'Dan',
    content: 'here'
  },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  // if (term) {
  //   const filteredPosts = posts.filter((post) => {
  //     return (post.title.includes(term));
  //   });
    // res.json(filteredPosts);
  // // }
  // if (posts.length === 0) {
  //   res.status(404).send({ error: 'Not found' });
  //   return;
  // }
  res.json(posts);
});

const post = {};

server.put('/posts', (req, res) => {

});

server.delete('/posts', (req, res) => {

});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title or content' });
    return;
  }
  if (post[title]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'That title already exists' });
    return;
  }
  post['title'] = title;
  post['content'] = content;
  posts.push(post);
  res.json(post);
});

module.exports = { posts, server };

