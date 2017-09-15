const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const posts = [];
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const tmp = posts.filter(
      post => post.title.includes(term) || post.contents.includes(term)
    );
    if (tmp.length > 0) {
      res.json(tmp);
      return;
    }
    res.status(STATUS_USER_ERROR);
    res.json({ error: `No matching post with "${term}" found.` });
    return;
  }
  res.json(posts);
});

server.post('/posts', (req, res) => {
  const id = Math.floor(Math.random() * ((100 - 1) + 1));
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide title and content.' });
    return;
  }
  posts.push({ id, title, contents });
  res.json({ id, title, contents });
});

server.put('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide id, title and content to update post.' });
    return;
  }
  if (id) {
    posts.forEach((post) => {
      if (id === post.id) {
        post.title = title;
        post.contents = contents;
        res.json(post);
      }
    });
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'Please provide a valid post id.' });
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide post id to delete post.' });
    return;
  }
  if (id) {
    posts.forEach((post, i) => {
      if (id === post.id) {
        posts.splice(i, 1);
        res.json({ success: true });
      }
    });
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: `Post ${id} not found.` });
});

module.exports = { posts, server };
