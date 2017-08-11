const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.render('index.html');
});

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  res.send(posts);
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  
  // Should provide both title and contents...error message if not
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Provide a title and contents' });
    return;
  }
  posts.push(posts);
  res.send(posts);

});

server.put('/posts', (req, res) => {
  res.send('Got a PUT request');
});

server.delete('/posts', (req, res) => {
  res.send('Got a DELETE request');
});

module.exports = { posts, server };
