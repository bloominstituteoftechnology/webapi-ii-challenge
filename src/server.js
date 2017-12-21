const bodyParser = require('body-parser');
const express = require('express');


const STATUS_USER_ERROR = 422;

let posts = [
  {
    title: 'one',
    contents: 'I was petrified.',
    id: 0
  },
  {
    title: 'two',
    contents: 'Kept thinkin I could never live without you by my side.',
    id: 1
  },
  {
    title: 'three',
    contents: 'Then I spent so many nights just thinking how you done me wrong',
    id: 2
  },
  {
    title: 'four',
    contents: 'And I grew strong, and I learned how to get along!',
    id: 3
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

server.get('/posts/:term', (req, res) => {
  const post = posts.find(item => item.title.includes(req.params.term) || item.contents.includes(req.params.term));
  res.status(200).json(post);
});

server.post('/posts', (req, res) => {
  if (typeof req.body.title === 'string' && typeof req.body.contents === 'string') {
    const post = { title: req.body.title, contents: req.body.contents, id: posts.length } 
    posts.push(post);
    res.status(200).json(post);
  } else {
    res.status(503).json({ error: 'POST: missing title and/or body' });
  }
});

server.put('/posts',  (req, res) => {
  if (typeof req.body.title === 'string' && typeof req.body.contents === 'string' && typeof req.body.id === 'string') {
    if (parseInt(req.body.id) && parseInt(req.body.id) <= posts.length) {
      const post = { title: req.body.title, contents: req.body.contents, id: req.body.id };
      posts[req.body.id] = post;
      res.status(200).json(post);
    } else {
      res.status(503).json({ error: 'POST: ID not found' });
    }
  } else {
    res.status(503).json({ error: 'POST: missing title, body, or ID' });
  }
});

server.delete('/posts/:id', (req, res) => {
  if (req.params.id && req.params.id <= posts.length) {
    posts = posts.splice(req.params.id, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'DELETE: could not find item to be deleted' });
  }
});

module.exports = { posts, server };
