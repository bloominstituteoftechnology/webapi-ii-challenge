const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const NOT_FOUND = 404;

const posts = [];

let idCounter = 0;

const server = express();
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const searchArray = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.contents.toLowerCase().includes(term.toLowerCase())
      );
    });
    if (searchArray.length < 1) {
      res.status(NOT_FOUND);
      res.json({ error: `${term} was not found` });
    } else {
      res.json(searchArray);
    }
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Posts must contain BOTH a title and contents' });
  } else {
    idCounter += 1;
    posts.push(
      {
        id: `${idCounter}`,
        title,
        contents,
      }
    );
    res.json(posts);
  }
}
);

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const index = () => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === req.body.id) {
        return i;
      }
    }
  };
  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Posts must contain a title, an id, and contents' });
  } else if (id !== req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must update an existing post' });
  } else {
    posts.splice(index(), 1, { id, title, contents });
    res.json(posts);
  }
});

server.delete('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const index = () => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === req.body.id) {
        return i;
      }
    }
  };
  if (!id) {
    res.status(STATUS_USER_ERROR)
    res.json({ error: 'User must provide matching id to delete post' });
  } else if ( id !== req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must delete an existing post' });
  } else {
    posts.splice(index(), 1);
    res.json(posts);
  }
});

module.exports = { posts, server };
