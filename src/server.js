const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_CREATED = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let nextID = 1;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.get('/posts', (req, res) => {
  // stringify the data to present in browser
  // const bob = posts.filter(h => h.name.includes('Bob'))
  // req.query localhost:3000/hobbits?term=baggins => req.query.term
  // req.body req.params localhost:3000/hobbits/:id localhost:3000/hobbits/1
  const term = req.query.term;
  if (term) {
    // writing the response term here
    // respond with posts matching the given term
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 ||
        post.contents.indexOf(term) !== -1;
    });
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post title!' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post content' });
    return;
  }
  const post = { id: nextID, title, contents };
  nextID += 1;
  posts.push(post);
  // save to data base
  res.status(STATUS_CREATED).json(post);
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post id!' });
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post title!' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post constent!' });
    return;
  }
  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Could not find a post with id ${id}` });
    return;
  }
  // easier to update post object directly than replace it in the array
  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post id!' });
    return;
  }
  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Couldn't fina a post with id ${id}!` });
    return;
  }
  posts = posts.filter((p => p.id !== id));
  res.json({ success: true });
});

module.exports = { posts, server };
