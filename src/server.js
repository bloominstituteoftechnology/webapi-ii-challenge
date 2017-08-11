const bodyParser = require('body-parser');
const express = require('express');
let id = 0;
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
  if (term) {
    const filteredPosts = posts.filter((post) => {
      return (post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1);
    });
    res.json(filteredPosts);
  }
  if (!term) {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide contents' });
    return;
  }
  const newPost = {
    id,
    title,
    contents
  };
  posts.push(newPost);
  res.json(newPost);
  id++;
});

server.put('/posts', (req, res) => {
  
});

server.delete('/posts', (req, res) => {

});

module.exports = { posts, server };

